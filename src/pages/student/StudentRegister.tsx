import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const StudentRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    classLevel: ""
  });
  const { toast } = useToast();
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const classLevels = [
    { value: "jss1", label: "JSS 1" },
    { value: "jss2", label: "JSS 2" },
    { value: "jss3", label: "JSS 3" },
    { value: "ss1", label: "SS 1" },
    { value: "ss2", label: "SS 2" },
    { value: "ss3", label: "SS 3" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!formData.classLevel) {
    toast({
      title: "Error",
      description: "Please select your class level.",
      variant: "destructive"
    });
    return;
  }

  setLoading(true);

  try {
    alert("start")
    const { error } = await signUp(formData.email, formData.password, {
      full_name: formData.fullName,
      role: 'student', 
      class_level: formData.classLevel
    });
    alert(error)
    if (error) throw error;
    
    toast({
      title: "Registration successful!",
      description: "Please check your email to confirm your account.",
    });
    navigate('/student/login');
  } catch (error: any) {
    toast({
      title: "Registration failed",
      description: error.message || 'An error occurred during registration',
      variant: "destructive"
    });
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleClassLevelChange = (value: string) => {
    setFormData({
      ...formData,
      classLevel: value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
            <BookOpen className="h-8 w-8" />
            <span className="text-2xl font-bold">Scholar Share Zone</span>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900">Student Registration</CardTitle>
            <CardDescription>
              Create your account to access class materials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="classLevel">Class Level</Label>
                <Select onValueChange={handleClassLevelChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your class level" />
                  </SelectTrigger>
                  <SelectContent>
                    {classLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/student/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 text-center">
          <Link to="/teacher/register" className="text-sm text-gray-600 hover:text-gray-800">
            Are you a teacher? Click here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
