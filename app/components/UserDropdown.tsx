/* eslint-disable @next/next/no-img-element */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MenuIcon } from 'lucide-react';
// import Image from 'next/image';
import profile from '../../public/default-image.jpeg';
import Link from 'next/link';
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/components';

interface iAppProps {
  userImage: string | null;
}
export function UserDropdown({ userImage }: iAppProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full border px-2 py-2 lg:px-4 flex items-center gap-x-3">
          <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
          <img
            // src={userImage ?? profile}
            src={`${userImage} ?? ${profile}`}
            alt="profile image"
            className="hidden lg:block rounded-full h-8 w-8"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem className="">
          <Link href={'/r/create'} className="w-full">
            Create Community
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={'/create'} className="w-full">
            Create Post
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={'/settings'} className="w-full">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutLink className="w-full">Logout</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
