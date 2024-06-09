import Link from 'next/link';
import redditText from '../../public/reddit.png';
import redditMoble from '../../public/reddit_mobile.webp';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { UserDropdown } from './UserDropdown';

export async function NavBar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="h-[10vh] w-full flex items-center border0b px-5 lg:px-14 justify-between">
      <Link href={'/'}>
        <Image
          src={redditMoble}
          alt="reddit logo"
          className="h-10 w-fit lg:hidden"
        />
        <Image
          src={redditText}
          alt="reddit logo"
          className="h-20 w-fit hidden lg:block"
        />
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {/* check if user is available before rendering */}
        {user ? (
          <div>
            <UserDropdown userImage={user.picture} />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button variant="secondary" asChild>
              <RegisterLink>Sign up</RegisterLink>
            </Button>
            <Button asChild>
              <LoginLink>Log in</LoginLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
