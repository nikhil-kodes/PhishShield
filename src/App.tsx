import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster as HotToaster } from "react-hot-toast";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "next-themes";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { NavBar } from "@/components/blocks/NavBar";
import { ScrollToHash } from "@/components/ui/hashScroll";

// Layouts/Blocks
import { DashboardPage } from "@/components/blocks/DashboardPage";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import Threats from "./pages/Threats";
import URLScanner from "./pages/URLScanner";
import Team from "./pages/Team";
import RealTimeMap from "./pages/RealTimeMap";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
			retry: 1,
		},
	},
});

const AppContent = () => {
	const location = useLocation();
	const isHome = location.pathname === "/";
	const isFullHUD = location.pathname === "/dashboard/map";

	return (
		<div className="relative min-h-screen bg-background text-foreground transition-colors duration-300">
			{!isFullHUD && <NavBar />}
			<main className={(!isHome && !isFullHUD) ? "pt-[60px]" : ""}>
				<ScrollToHash />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/pricing" element={<Pricing />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					
					{/* Dashboard & Sub-routes */}
					<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
					<Route path="/dashboard/threats" element={<ProtectedRoute><DashboardPage><Threats /></DashboardPage></ProtectedRoute>} />
					<Route path="/dashboard/scanner" element={<ProtectedRoute><DashboardPage><URLScanner /></DashboardPage></ProtectedRoute>} />
					<Route path="/dashboard/team" element={<ProtectedRoute><DashboardPage><Team /></DashboardPage></ProtectedRoute>} />
					<Route path="/dashboard/map" element={<ProtectedRoute><RealTimeMap /></ProtectedRoute>} />
					
					<Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
					<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
		</div>
	);
};

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<TooltipProvider>
						<BrowserRouter>
							<AppContent />
							<Toaster />
							<Sonner position="top-center" />
							<HotToaster position="top-right" />
						</BrowserRouter>
					</TooltipProvider>
				</ThemeProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
};

export default App;
