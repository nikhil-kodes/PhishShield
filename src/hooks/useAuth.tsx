import React, { createContext, useContext, useEffect, useState } from "react";
import { apiClient, type User } from "@/services/apiClient";
import { toast } from "react-hot-toast";

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<boolean>;
	signup: (userData: {
		name: string;
		email: string;
		password: string;
		phoneNumber: string;
	}) => Promise<boolean>;
	logout: () => Promise<void>;
	updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const isAuthenticated = !!user && apiClient.isAuthenticated();

	// Load user data on app start
	useEffect(() => {
		const loadUser = async () => {
			if (apiClient.isAuthenticated()) {
				try {
					const response = await apiClient.getUserProfile();
					if (response.ok && response.data) {
						setUser(response.data);
					} else {
						await apiClient.logout();
					}
				} catch (error) {
					console.error("Failed to load user:", error);
					await apiClient.logout();
				}
			}
			setIsLoading(false);
		};

		loadUser();
	}, []);

	const login = async (email: string, password: string): Promise<boolean> => {
		try {
			setIsLoading(true);
			// if (email === "user@phishshield.ai" && password === "password") {
			// 	const demoUser: User = {
			// 		id: "demo-id",
			// 		name: "Demo User",
			// 		email: "user@phishshield.ai",
			// 		avatar: "",
			// 		credits: 100,
			// 		phoneNumber: "0000000000",
			// 		createdAt: new Date().toISOString(),
			// 	};
			// 	setUser(demoUser);
			// 	toast.success("Logged in with Demo Account 🎉");
			// 	return true;
			// }
			const response = await apiClient.login({ email, password });
			console.log(response);
			if (response.ok && response.data) {
				const { token, user } = response.data;
				apiClient.setAuthToken(token);
				setUser(user);
				toast.success("Welcome back!");
				return true;
			} else {
				toast.error(response.error || "Login failed");
				return false;
			}
		} catch (error) {
			toast.error("Login failed. Please try again.");
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	const signup = async (userData: {
		name: string;
		email: string;
		password: string;
		phoneNumber: string;
	}): Promise<boolean> => {
		try {
			setIsLoading(true);
			const response = await apiClient.signup(userData);

			if (response.ok && response.data) {
				const { token, user } = response.data;
				apiClient.setAuthToken(token);
				setUser(user);
				toast.success("Account created successfully!");
				return true;
			} else {
				toast.error(response.error || "Signup failed");
				return false;
			}
		} catch (error) {
			toast.error("Signup failed. Please try again.");
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	const logout = async (): Promise<void> => {
		try {
			apiClient.removeAuthToken();
			// await apiClient.logout();
			setUser(null);
			toast.success("Logged out successfully");
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	const updateUser = async (userData: Partial<User>): Promise<void> => {
		try {
			const response = await apiClient.updateUserProfile(userData);

			if (response.ok && response.data) {
				setUser(response.data);
				toast.success("Profile updated successfully");
			} else {
				toast.error(response.error || "Update failed");
			}
		} catch (error) {
			toast.error("Update failed. Please try again.");
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoading,
				isAuthenticated,
				login,
				signup,
				logout,
				updateUser,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
