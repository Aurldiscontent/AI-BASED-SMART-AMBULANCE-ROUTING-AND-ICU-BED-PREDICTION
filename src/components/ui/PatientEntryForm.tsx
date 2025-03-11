
import React, { useState } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AlertTriangle, User, Calendar, Thermometer, Stethoscope, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Form schema definition
const patientFormSchema = z.object({
  name: z.string().min(2, { message: "Patient name must be at least 2 characters." }),
  age: z.string().regex(/^\d+$/, { message: "Age must be a valid number." }),
  condition: z.string().min(1, { message: "Patient condition is required." }),
  emergencyType: z.string().min(1, { message: "Emergency type is required." }),
  location: z.string().min(5, { message: "Location must be at least 5 characters." }),
});

type PatientFormValues = z.infer<typeof patientFormSchema>;

interface PatientEntryFormProps {
  onSubmit: (data: PatientFormValues) => void;
}

const PatientEntryForm: React.FC<PatientEntryFormProps> = ({ onSubmit }) => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const isDark = theme === 'dark';
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: "",
      age: "",
      condition: "",
      emergencyType: "",
      location: "",
    },
  });

  const handleSubmit = (values: PatientFormValues) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      onSubmit(values);
      setIsLoading(false);
      
      toast({
        title: "Patient details submitted",
        description: "Finding nearest available hospitals...",
      });
      
      // Reset form after submission
      form.reset();
    }, 1000);
  };

  return (
    <div className={`rounded-xl overflow-hidden shadow-md ${
      isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    }`}>
      <div className="bg-gradient-to-r from-medical-500 to-medical-600 p-4">
        <h2 className="text-lg font-bold text-white flex items-center">
          <AlertTriangle className="mr-2" size={18} />
          New Emergency Patient
        </h2>
      </div>
      
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <User size={14} className="mr-1" />
                      Patient Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      Age
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Patient age" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Thermometer size={14} className="mr-1" />
                      Patient Condition
                    </FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="severe">Severe</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="stable">Stable</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="emergencyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Stethoscope size={14} className="mr-1" />
                      Emergency Type
                    </FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select emergency type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cardiac">Cardiac</SelectItem>
                        <SelectItem value="trauma">Trauma</SelectItem>
                        <SelectItem value="neurological">Neurological</SelectItem>
                        <SelectItem value="respiratory">Respiratory</SelectItem>
                        <SelectItem value="burns">Burns</SelectItem>
                        <SelectItem value="pediatric">Pediatric</SelectItem>
                        <SelectItem value="obstetric">Obstetric</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <AlertTriangle size={14} className="mr-1" />
                    Emergency Location
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter precise location" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter an exact address or landmark for faster response
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-medical-600 hover:bg-medical-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="mr-2">Processing</span>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  Submit Emergency
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PatientEntryForm;
