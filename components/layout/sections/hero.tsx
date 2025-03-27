"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { postQuestion } from "@/api/index"
//import { toast } from "sonner"

//import { toast } from "@/components/hooks/use-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
 
const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
})
export const HeroSection = () => {
  const { theme } = useTheme();
  const [ loading, setLoading ] = useState(false)
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  })
 
  const handleSubmit = async (values: { title: string }) => {
    //e.preventDefault();
    setLoading(true);
    setError("");
    setQuestions([]);

    try {
      const response = await postQuestion({ title: values.title });

      const data = response.data;
      console.log(data);
      if (data) {
        setQuestions(data.questions);
      } else {
        setError(data.error || "Failed to fetch questions");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);

    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="container w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-10 md:py-20">
        <div className="text-center space-y-8 mb-20">
          <Badge variant="outline" className="text-sm py-2">
            <span className="mr-2 text-primary">
              <Badge>New</Badge>
            </span>
            <span> Design is out now! </span>
          </Badge>

          <div className="max-w-screen-lg mx-auto text-center text-3xl md:text-5xl font-bold">
            <h1>
              AI-Powered Survey Generator: 
              <p className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
              Create & Analyze with Ease
              </p>
            </h1>
          </div>

          <p className="max-w-screen-lg mx-auto text-xl text-muted-foreground">
            {`How to Use: Simply enter a topic in the input field below, and our AI will instantly generate five relevant survey questions. Answer the questions and submit your responses to gain valuable insights. Its quick, easy, and AI-powered!`}
          </p>
    
          <Form {...form} >
            <form onSubmit={form.handleSubmit(handleSubmit)} className=" w-full justify-center items-center space-y-6 flex gap-12">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="title" />
                    </FormControl>
                    <FormDescription>
                      Enter title.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="bg-orange-600 rounded-md w-5/6 md:w-1/4 p-0 -translate-y-2.5 transition-transform">
              <Button type="submit" disabled={loading ? true : false} className="w-full font-bold group/arrow">
              Submit
              {
                loading ? 
                <Loader2 className="animate-spin" />:
                <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
              }
            </Button>
              </div>
            </form>
          </Form>
              
        </div>

        <div className="relative w-full flex justify-center items-center  ">
          <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
          <div className="w-3/4 h-1/2 ">
              <p>
              {questions.length > 0 && (
                <div className="mt-6 w-full bg-white p-6 rounded-lg shadow-md overflow-y-scroll">
                  <h2 className="text-xl font-bold mb-4">Generated Questions:</h2>
                  <ul className="list-disc pl-5">
                    {questions.map((question, index) => (
                      <li key={index} className="mb-2 text-gray-700">
                        {question}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              </p>
          </div>
          

          <div className="absolute bottom-0 left-0 w-full  h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};
