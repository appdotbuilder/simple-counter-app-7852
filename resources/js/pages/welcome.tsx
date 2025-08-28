import { type SharedData } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';

interface Props {
    count?: number;
    [key: string]: unknown;
}

export default function Welcome({ count = 0 }: Props) {
    const { auth } = usePage<SharedData>().props;

    const handleIncrement = () => {
        router.post(route('counter.increment'), {}, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleDecrement = () => {
        router.post(route('counter.decrement'), {}, {
            preserveState: true,
            preserveScroll: true
        });
    };

    return (
        <>
            <Head title="🔢 Simple Counter App">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-center shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <div className="mb-8">
                                <h1 className="mb-4 text-4xl font-bold">🔢 Simple Counter</h1>
                                <p className="mb-8 text-lg text-[#706f6c] dark:text-[#A1A09A]">
                                    A beautiful, interactive counter application. Click the buttons to increment or decrement the count!
                                </p>
                            </div>

                            {/* Counter Display */}
                            <div className="mb-12">
                                <div className="mb-6 inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-4xl font-bold shadow-lg">
                                    {count}
                                </div>
                                <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">Current Count</p>
                            </div>

                            {/* Counter Controls */}
                            <div className="flex items-center justify-center gap-4 mb-12">
                                <button
                                    onClick={handleDecrement}
                                    className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white text-2xl font-bold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
                                    title="Decrement"
                                >
                                    −
                                </button>
                                <div className="flex flex-col items-center px-6">
                                    <span className="text-2xl font-bold text-[#1b1b18] dark:text-[#EDEDEC]">{count}</span>
                                    <span className="text-xs text-[#706f6c] dark:text-[#A1A09A] mt-1">Current Value</span>
                                </div>
                                <button
                                    onClick={handleIncrement}
                                    className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white text-2xl font-bold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
                                    title="Increment"
                                >
                                    +
                                </button>
                            </div>

                            {/* Features */}
                            <div className="mb-8 text-left">
                                <h3 className="text-xl font-semibold mb-4 text-center">✨ Features</h3>
                                <ul className="space-y-2 max-w-md mx-auto">
                                    <li className="flex items-center gap-3">
                                        <span className="text-green-500">✓</span>
                                        <span>Real-time counter updates</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="text-green-500">✓</span>
                                        <span>Smooth animations and transitions</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="text-green-500">✓</span>
                                        <span>Dark mode support</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="text-green-500">✓</span>
                                        <span>Persistent counter state</span>
                                    </li>
                                </ul>
                            </div>

                            {!auth.user && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-medium mb-4">🚀 Ready to get started?</h3>
                                    <div className="flex items-center justify-center gap-4">
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                                        >
                                            Create Account
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center px-6 py-3 border border-gray-300 hover:border-gray-400 text-[#1b1b18] dark:text-[#EDEDEC] dark:border-[#3E3E3A] dark:hover:border-[#62605b] font-medium rounded-lg transition-colors duration-200"
                                        >
                                            Sign In
                                        </Link>
                                    </div>
                                </div>
                            )}

                            <footer className="mt-12 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                Built with ❤️ by{" "}
                                <a 
                                    href="https://app.build" 
                                    target="_blank" 
                                    className="font-medium text-[#f53003] hover:underline dark:text-[#FF4433]"
                                >
                                    app.build
                                </a>
                            </footer>
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}