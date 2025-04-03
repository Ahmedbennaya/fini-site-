
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Mail, Lock, Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Get the redirect path from location state or default to "/"
  const from = (location.state as any)?.from?.pathname || '/';

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const { success, error } = await signIn(values.email, values.password);
      
      if (success) {
        toast({
          title: t('auth.loginSuccess'),
          description: t('auth.loginSuccess'),
        });
        navigate(from, { replace: true });
      } else {
        toast({
          variant: 'destructive',
          title: t('auth.invalidCredentials'),
          description: error,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('auth.invalidCredentials'),
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section-padding">
      <div className="container-luxury max-w-md">
        <div className="glass p-8 rounded-sm mb-8">
          <h1 className="heading-md text-center mb-6">{t('auth.loginTitle')}</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('auth.email')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          {...field}
                          className="pl-10"
                          type="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>{t('auth.password')}</FormLabel>
                      <Link to="/forgot-password" className="text-sm text-luxury-600 hover:text-luxury-800 transition-colors">
                        {t('auth.forgotPassword')}
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          {...field}
                          className="pl-10"
                          type="password"
                          autoComplete="current-password"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full btn-luxury" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('buttons.login')}...
                  </>
                ) : (
                  t('buttons.login')
                )}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center">
            <p className="text-luxury-600">
              {t('auth.noAccount')}{' '}
              <Link to="/signup" className="text-luxury-800 hover:text-luxury-900 transition-colors font-medium">
                {t('buttons.signup')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
