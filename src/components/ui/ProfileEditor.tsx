
import React, { useState } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { motion } from 'framer-motion';
import { User, Phone, Mail, Heart, Plus, X, Save, UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Form schema definition
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  role: z.string().optional(),
  medicalHistory: z.string().optional(),
  emergencyContacts: z.array(
    z.object({
      name: z.string().min(2, { message: "Contact name must be at least 2 characters." }),
      phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
      relationship: z.string().optional(),
    })
  ),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileEditorProps {
  initialData?: ProfileFormValues;
  onSave?: (data: ProfileFormValues) => void;
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ 
  initialData = {
    name: localStorage.getItem('userName') || '',
    email: localStorage.getItem('userEmail') || '',
    phone: '',
    role: localStorage.getItem('userRole') || '',
    medicalHistory: '',
    emergencyContacts: [],
  },
  onSave 
}) => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const isDark = theme === 'dark';
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: initialData,
  });

  // Add emergency contact
  const addEmergencyContact = () => {
    const currentContacts = form.getValues('emergencyContacts') || [];
    form.setValue('emergencyContacts', [
      ...currentContacts,
      { name: '', phone: '', relationship: '' }
    ]);
  };

  // Remove emergency contact
  const removeEmergencyContact = (index: number) => {
    const currentContacts = form.getValues('emergencyContacts') || [];
    form.setValue('emergencyContacts', 
      currentContacts.filter((_, i) => i !== index)
    );
  };

  // Handle form submission
  const handleSubmit = (values: ProfileFormValues) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (onSave) {
        onSave(values);
      }
      
      // Store basic info in localStorage
      localStorage.setItem('userName', values.name);
      localStorage.setItem('userEmail', values.email);
      if (values.role) {
        localStorage.setItem('userRole', values.role);
      }
      
      setIsLoading(false);
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      });
    }, 1000);
  };

  return (
    <div className={`rounded-xl overflow-hidden shadow-md ${
      isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    }`}>
      <div className="bg-gradient-to-r from-medical-500 to-medical-600 p-4">
        <h2 className="text-lg font-bold text-white flex items-center">
          <User className="mr-2" size={18} />
          Edit Profile
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
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <User size={14} className="mr-1" />
                      Role
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Your role (e.g., First Responder)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Mail size={14} className="mr-1" />
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Phone size={14} className="mr-1" />
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="medicalHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Heart size={14} className="mr-1" />
                    Medical History
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add any relevant medical history or conditions"
                      className="h-20 resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    This information will be shared with emergency responders when needed
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Emergency Contacts Section */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className={`font-medium flex items-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <UserPlus size={16} className="mr-1" />
                  Emergency Contacts
                </h3>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={addEmergencyContact}
                  className={isDark ? 'border-gray-700 text-gray-300' : ''}
                >
                  <Plus size={14} className="mr-1" />
                  Add Contact
                </Button>
              </div>
              
              {form.watch('emergencyContacts')?.map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-3 rounded-lg mb-3 relative ${
                    isDark ? 'bg-gray-700/40' : 'bg-gray-50'
                  }`}
                >
                  <button
                    type="button"
                    className={`absolute top-2 right-2 rounded-full p-1 ${
                      isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                    }`}
                    onClick={() => removeEmergencyContact(index)}
                  >
                    <X size={14} />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <FormField
                      control={form.control}
                      name={`emergencyContacts.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Contact name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`emergencyContacts.${index}.phone`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Contact phone" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`emergencyContacts.${index}.relationship`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Relationship</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g., spouse, parent" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </motion.div>
              ))}
              
              {form.watch('emergencyContacts')?.length === 0 && (
                <div className={`py-4 px-3 text-center rounded ${
                  isDark ? 'bg-gray-700/40 text-gray-400' : 'bg-gray-50 text-gray-500'
                }`}>
                  <p className="text-sm">No emergency contacts added yet</p>
                </div>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-medical-600 hover:bg-medical-700 mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="mr-2">Saving</span>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  Save Profile
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileEditor;
