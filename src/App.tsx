import { useState, ChangeEvent } from "react";
import * as Router from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
// import { toast } from "./components/ui/toast"; // Assuming you have a toast component for notifications
import { useToast } from "@/components/ui/use-toast";
const OTP_LENGTH = 8;
import { Toaster } from "@/components/ui/toaster";
export default function App() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const { toast } = useToast();
  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    if (/^[a-zA-Z0-9]?$/.test(value)) {
      // Allow only alphanumeric characters, empty string for deletion
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1); // Ensure only the last character entered is taken
      setOtp(newOtp);

      // Move focus to next input if value is added
      if (value && index < OTP_LENGTH - 1) {
        const nextInput = document.querySelector<HTMLInputElement>(
          `input[name=otp-${index + 1}]`
        );
        if (nextInput) {
          nextInput.focus();
        }
      }

      // Move focus to previous input if value is removed
      if (!value && index > 0) {
        const prevInput = document.querySelector<HTMLInputElement>(
          `input[name=otp-${index - 1}]`
        );
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  const handleSubmit = () => {
    const otpString = otp.join("");
    const isValid = otp.every((char) => char === otp[0] && char !== ""); // Check if all characters are the same and not empty
    console.log("🚀 ~ handleSubmit ~ isValid:", isValid);
    if (otpString === "cesaiust") {
      toast({
        title: "خرد و دانش و آگاهی دانشمندان / ره سرمنزل مقصود بما آموز ",
        description: " میدونستین آلن تورینگ نقش خیلی مهمی تو کامپیوتر داشته؟ ",
      }); // Display success notification
    } else {
      toast({
        // title: "Scheduled: Catch up ",
        description: "🤬 Is not correct",
      }); // Display error notification
    }
    console.log("OTP entered:", otpString);
  };

  return (
    <Router.BrowserRouter>
      <Toaster />
      <div className="font-custom">
        <Router.Routes>
          <Router.Route
            path="/"
            element={
              <div className="h-screen flex justify-center text-center items-center">
                <Card className="h-80 w-fit flex justify-between flex-col">
                  <CardHeader>
                    <h1>Enter 8 Characters</h1>
                    <h1>put them in a order that make sense!</h1>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-row justify-center">
                      {otp.map((char, index) => (
                        <Input
                          key={index}
                          className="w-10 m-1 text-center"
                          name={`otp-${index}`}
                          value={char}
                          onChange={(e) => handleChange(index, e)}
                          maxLength={1}
                        />
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSubmit}>Submit</Button>
                  </CardFooter>
                </Card>
              </div>
            }
          />
        </Router.Routes>
      </div>
    </Router.BrowserRouter>
  );
}
