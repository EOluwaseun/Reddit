import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import profile from '../../public/default-image.jpeg';

export function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full border px-2 py-2 lg:px-4 flex items-center gap-x-3">
          <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
          <Image
            src={profile}
            alt="profile image"
            className="hidden lg:block rounded-full h-8 w-8"
          />
        </div>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
