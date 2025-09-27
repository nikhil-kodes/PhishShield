import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
	CheckCircle,
	XCircle,
	Award,
	ArrowRight,
	ArrowLeft,
	RotateCcw,
	Trophy,
	Star,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { apiClient, type QuizQuestionNew } from "@/services/apiClient";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface QuizState {
	currentQuestion: number;
	answers: Record<string, string>;
	showExplanation: boolean;
	selectedOption: number | null;
	isComplete: boolean;
	results: any;
}

export default function Quiz() {
	const { user } = useAuth();
	const [quizState, setQuizState] = useState<QuizState>({
		currentQuestion: 0,
		answers: {},
		showExplanation: false,
		selectedOption: null,
		isComplete: false,
		results: null,
	});

	const { data: questionsObj, isLoading } = useQuery({
		queryKey: ["quiz-questions"],
		queryFn: () => apiClient.getQuizQuestions(5), // API returns { "0": {...}, "1": {...} }
		select: (response) => response.data,
	});

	// Convert object to array for indexing
	const questions = questionsObj ? Object.values(questionsObj) : [];

	const submitQuizMutation = useMutation({
		mutationFn: (answers: Record<string, string>) =>
			apiClient.submitQuizResults(answers),
		onSuccess: (response) => {
			if (response.ok && response.data) {
				setQuizState((prev) => ({
					...prev,
					isComplete: true,
					results: response.data,
				}));
			}
		},
	});

	const currentQuestion = questions?.[quizState.currentQuestion];
	const progress =
		((quizState.currentQuestion + 1) / (questions?.length || 5)) * 100;

	const handleOptionSelect = (optionIndex: number) => {
		if (quizState.showExplanation) return;
		setQuizState((prev) => ({ ...prev, selectedOption: optionIndex }));
	};

	const handleSubmitAnswer = () => {
		if (quizState.selectedOption === null || !currentQuestion) return;

		// Store answer as text instead of index
		const selectedAnswerText =
			currentQuestion.options[quizState.selectedOption];

		// Check if the answer is correct
		const isCorrect = selectedAnswerText === currentQuestion.answer;

		const newAnswers = {
			...quizState.answers,
			[quizState.currentQuestion]: selectedAnswerText,
		};

		setQuizState((prev) => ({
			...prev,
			answers: newAnswers,
			showExplanation: true,
		}));
		if (isCorrect && user) {
			user.credits += 5; // update local user object
		}
	};

	const handleNextQuestion = () => {
		if (!questions) return;

		if (quizState.currentQuestion < questions.length - 1) {
			setQuizState((prev) => ({
				...prev,
				currentQuestion: prev.currentQuestion + 1,
				selectedOption: null,
				showExplanation: false,
			}));
		} else {
			// Submit quiz
			submitQuizMutation.mutate(quizState.answers);
		}
	};

	const restartQuiz = () => {
		setQuizState({
			currentQuestion: 0,
			answers: {},
			showExplanation: false,
			selectedOption: null,
			isComplete: false,
			results: null,
		});
	};

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="animate-pulse space-y-4 text-center">
					<div className="h-8 w-48 bg-muted rounded mx-auto"></div>
					<div className="h-4 w-32 bg-muted rounded mx-auto"></div>
				</div>
			</div>
		);
	}

	if (quizState.isComplete && quizState.results) {
		const { score, correctAnswers, totalQuestions, creditsEarned } =
			quizState.results;
		const percentage = Math.round(score);

		return (
			// Keep your existing "quiz complete" UI exactly the same
			<div>...same as before...</div>
		);
	}

	if (!questions?.length) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center space-y-4">
					<h2 className="text-2xl font-bold">No questions available</h2>
					<p className="text-muted-foreground">Please try again later</p>
					<Button asChild>
						<Link to="/dashboard">Back to Dashboard</Link>
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
			<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Header & Progress bar */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center space-y-4 mb-8">
					<h1 className="text-3xl font-bold">Cybersecurity Knowledge Quiz</h1>
					<p className="text-muted-foreground">
						Test your knowledge and earn credits to unlock features
					</p>
					<div className="space-y-2">
						<div className="flex justify-between text-sm">
							<span>
								Question {quizState.currentQuestion + 1} of {questions.length}
							</span>
							<span>{Math.round(progress)}% Complete</span>
						</div>
						<Progress
							value={progress}
							className="h-2"
						/>
					</div>
				</motion.div>

				{/* Question Card */}
				<AnimatePresence mode="wait">
					<motion.div
						key={quizState.currentQuestion}
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -50 }}
						transition={{ duration: 0.3 }}>
						<Card className="shadow-strong">
							<CardHeader>
								<CardTitle className="text-xl">
									{currentQuestion?.question}
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="space-y-3">
									{currentQuestion?.options.map((option, index) => {
										const isSelected = quizState.selectedOption === index;
										const isCorrect = option === currentQuestion.answer;
										const showResult = quizState.showExplanation;

										let className =
											"text-left h-auto p-4 transition-all duration-200 border rounded-lg";

										if (showResult) {
											if (isCorrect)
												className +=
													" border-success bg-success/10 text-gray-900";
											else if (isSelected && !isCorrect)
												className +=
													" border-destructive bg-destructive/10 text-gray-400";
										} else if (isSelected) {
											className += " border-primary bg-primary/10";
										}

										return (
											<motion.div
												key={index}
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: index * 0.1 }}>
												<Button
													variant="outline"
													onClick={() => handleOptionSelect(index)}
													disabled={quizState.showExplanation}
													className={className}>
													<div className="flex items-center gap-3 w-full">
														<div className="w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0">
															{showResult && isCorrect && (
																<CheckCircle className="h-5 w-5 text-success" />
															)}
															{showResult && isSelected && !isCorrect && (
																<XCircle className="h-5 w-5 text-destructive" />
															)}
															{!showResult && (
																<span className="text-sm font-medium">
																	{String.fromCharCode(65 + index)}
																</span>
															)}
														</div>
														<span className="flex-1">{option}</span>
													</div>
												</Button>
											</motion.div>
										);
									})}
								</div>

								{/* Explanation */}
								<AnimatePresence>
									{quizState.showExplanation && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											exit={{ opacity: 0, height: 0 }}
											className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
											<h4 className="font-semibold mb-2 flex items-center gap-2">
												<Star className="h-4 w-4 text-primary" /> Explanation
											</h4>
											<p className="text-sm text-muted-foreground">
												{currentQuestion?.explanation}
											</p>
										</motion.div>
									)}
								</AnimatePresence>

								{/* Action Buttons */}
								<div className="flex justify-between pt-4">
									<Button
										variant="outline"
										onClick={() =>
											setQuizState((prev) => ({
												...prev,
												currentQuestion: Math.max(0, prev.currentQuestion - 1),
											}))
										}
										disabled={quizState.currentQuestion === 0}
										className="flex items-center gap-2">
										<ArrowLeft className="h-4 w-4" /> Previous
									</Button>

									{!quizState.showExplanation ? (
										<Button
											onClick={handleSubmitAnswer}
											disabled={quizState.selectedOption === null}
											className="bg-gradient-primary text-white flex items-center gap-2">
											Submit Answer
										</Button>
									) : (
										<Button
											onClick={handleNextQuestion}
											disabled={submitQuizMutation.isPending}
											className="bg-gradient-primary text-white flex items-center gap-2">
											{quizState.currentQuestion === questions.length - 1 ? (
												submitQuizMutation.isPending ? (
													"Submitting..."
												) : (
													"Finish Quiz"
												)
											) : (
												<>
													Next Question
													<ArrowRight className="h-4 w-4" />
												</>
											)}
										</Button>
									)}
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
