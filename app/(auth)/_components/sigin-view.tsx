import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import UserAuthForm from './user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ClientRegistrationForm from '@/components/cali/components_client-registration-form';
import Logo from '@/public/cali_logo.svg';
import LoginForm from '@/components/cali/components_login';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/examples/authentication"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 hidden md:right-8 md:top-8'
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full flex-col justify-center bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 flex h-[100%]  bg-gray-700" />
        <div className="flex flex-col">
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image src={Logo} alt="Cali Logo" />
          </div>
          <div className="relative z-20 mt-auto pt-4 text-gray-300">
            <p className="text-xl">Order Management System</p>
          </div>
        </div>
      </div>
      <div className="flex h-full items-center bg-gray-800 p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[4ß50px]">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
