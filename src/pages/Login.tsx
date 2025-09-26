import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Shield, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import logo from "@/assets/logo.png";

const loginSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z.string().min(1, "Password is required"),
	rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const { login, isAuthenticated, isLoading } = useAuth();
	const location = useLocation();

	const from = location.state?.from?.pathname || "/dashboard";

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	// Redirect if already authenticated
	if (isAuthenticated) {
		return (
			<Navigate
				to={from}
				replace
			/>
		);
	}

	const onSubmit = async (data: LoginFormData) => {
		const success = await login(data.email, data.password);
		// Navigation will be handled by the auth context
	};

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="flex flex-col items-center gap-4">
					<Loader2 className="h-8 w-8 animate-spin text-primary" />
					<p className="text-muted-foreground">Loading...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-primary/5 to-accent/10">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="w-full max-w-md">
				<Card className="shadow-strong">
					<CardHeader className="text-center space-y-4">
						<div className="flex justify-center">
							<div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
								<img
									src={logo}
									alt="PhishShield AI"
									className="w-10 h-10"
								/>
							</div>
						</div>
						<div>
							<CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
							<CardDescription>
								Sign in to your PhishShield AI account
							</CardDescription>
						</div>
					</CardHeader>

					<CardContent>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-6">
							{/* Demo Credentials Notice */}
							{/* <div className="bg-muted p-4 rounded-lg">
								<p className="text-sm text-muted-foreground">
									<strong>Demo credentials:</strong>
									<br />
									Email: user@phishshield.ai
									<br />
									Password: password
								</p>
							</div> */}

							<div className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="email">Email address</Label>
									<Input
										id="email"
										type="email"
										placeholder="Enter your email"
										{...register("email")}
										className={errors.email ? "border-destructive" : ""}
									/>
									{errors.email && (
										<p className="text-sm text-destructive">
											{errors.email.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="password">Password</Label>
									<div className="relative">
										<Input
											id="password"
											type={showPassword ? "text" : "password"}
											placeholder="Enter your password"
											{...register("password")}
											className={
												errors.password ? "border-destructive pr-10" : "pr-10"
											}
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
											{showPassword ? (
												<EyeOff className="h-4 w-4" />
											) : (
												<Eye className="h-4 w-4" />
											)}
										</button>
									</div>
									{errors.password && (
										<p className="text-sm text-destructive">
											{errors.password.message}
										</p>
									)}
								</div>

								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-2">
										<Checkbox
											id="rememberMe"
											{...register("rememberMe")}
										/>
										<Label
											htmlFor="rememberMe"
											className="text-sm">
											Remember me
										</Label>
									</div>
									<Link
										to="/forgot-password"
										className="text-sm text-primary hover:text-primary-dark transition-colors">
										Forgot password?
									</Link>
								</div>
							</div>

							<Button
								type="button"
								onClick={() => login("user@phishshield.ai", "password")}
								className="w-full bg-gray-600 text-white mt-2"
								size="lg">
								Login with Demo Account
							</Button>

							<Button
								type="submit"
								disabled={isSubmitting}
								className="w-full bg-gradient-primary text-white"
								size="lg">
								{isSubmitting ? (
									<div className="flex items-center gap-2">
										<Loader2 className="h-4 w-4 animate-spin" />
										Signing in...
									</div>
								) : (
									"Sign in"
								)}
							</Button>

							<div className="text-center">
								<p className="text-sm text-muted-foreground">
									Don't have an account?{" "}
									<Link
										to="/signup"
										className="text-primary hover:text-primary-dark transition-colors font-medium">
										Sign up
									</Link>
								</p>
							</div>
						</form>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}
