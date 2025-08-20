import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Login({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-6 rounded-xl bg-white/10 backdrop-blur-md shadow-lg",
        className
      )}
      {...props}
    >
      <div className="overflow-hidden p-0 rounded-xl shadow-none">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Form Section */}
          <form className="p-6 md:p-10 flex flex-col gap-6">
            <div className="flex flex-col items-center text-center gap-2">
              <h1 className="text-3xl font-bold text-white">Welcome back</h1>
              <p className="text-gray-300 text-sm">
                Login to your Acme Inc account
              </p>
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-gray-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="bg-white/40 text-white placeholder-gray-300"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-200">
                  Password
                </Label>
                <a
                  href="#"
                  className="text-sm text-blue-400 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="bg-white/40 text-white placeholder-gray-300"
              />
            </div>

            <Button type="submit" className="w-full bg-primary text-white hover:bg-primary-dark">
              Login
            </Button>

            {/* Divider */}
            <div className="relative text-center text-sm text-gray-300 ">
              <span className="bg-white/10 px-2 relative z-10">
                Or continue with
              </span>
              <div className="absolute inset-0 top-1/2 border-t border-gray-400 z-0 mt-5"></div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-1 gap-3">
            
                        <Button variant="outline" type="button" className="w-full bg-base-200">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="">Login with Google</span>
                </Button>

             
            </div>

            {/* Sign up */}
            <p className="text-center text-sm text-gray-300">
              Don&apos;t have an account?{" "}
              <a href="#" className="text-blue-400 hover:underline">
                Sign up
              </a>
            </p>
          </form>

          {/* Image Section */}
          <div className="relative hidden md:block">
            <img
              src="https://img.freepik.com/premium-vector/welcome-concept-illustration_86047-1033.jpg"
              alt="Welcome"
              className="absolute inset-0 h-full w-full object-cover brightness-75"
            />
          </div>
        </CardContent>
      </div>

    
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="relative bg-[url('/travel.jpg')] bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center p-6 md:p-10">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative w-full max-w-sm md:max-w-3xl">
        <Login />
      </div>
    </div>
  );
}
