import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import Link from "next/link";
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const profile = await getUserProfile(session.user.token);

    const isAdmin = profile?.data?.role === "admin";

    return (
        <div className="font-primary flex flex-col items-center justify-center min-h-screen p-8 gap-16 sm:p-20">

            <div className="text-5xl lg:text-6xl font-bold text-center text-gradient-primary">
                <span className="font-primary text-text-color">Profile</span>
            </div>

            <div className="flex flex-col items-center justify-evenly min-w-[50%] min-h-[40vh] bg-lime-color rounded-lg p-4">

                <div className="text-3xl lg:text-4xl font-bold flex flex-col items-center justify-center text-navy-color">
                    {profile.data.name}
                </div>

                <div className="text-lg lg:text-xl flex flex-col items-center justify-center px-4 py-2 gap-2 w-full">

                    <div className="text-lg font-medium bg-navy-color text-white rounded-lg p-2 w-full">
                        <MailIcon className="mr-4" /> 
                        {profile.data.email}
                    </div>

                    <div className="text-lg lg:text-xl font-medium bg-navy-color text-white rounded-lg p-2 w-full">
                        <PersonIcon className="mr-4" /> 
                        {profile.data.role}
                    </div>

                    <div className="text-lg lg:text-xl font-medium bg-navy-color text-white rounded-lg p-2 w-full">
                        <AccessTimeFilledIcon className="mr-4" /> 
                        {new Date(profile.data.createdAt).toLocaleDateString()}
                    </div>
                </div>
            </div>

            

            {/* ----------------------------- */}
            {/* Sign Out Button */}
            {/* ----------------------------- */}
            <Link href="/api/auth/signout">
                <button className="text-nowrap text-xl md:text-4xl md:py-4 md:px-12 cursor-pointer rounded-full bg-red-400 text-white px-6 py-2 hover:bg-red-500 hover:scale-105 transition-all duration-300">
                    Sign Out
                </button>
            </Link>

            {/* ----------------------------- */}
            {/* Admin-only "Manage Events" button */}
            {/* ----------------------------- */}
            {isAdmin && (
                <Link href="/admin">
                    <button className="text-nowrap text-xl md:text-4xl md:py-4 md:px-12 cursor-pointer rounded-full bg-blue-500 text-white px-6 py-2 hover:bg-blue-600 hover:scale-105 transition-all duration-300">
                        Manage Events
                    </button>
                </Link>
            )}

        </div>
    );
}