import Link from 'next/link'
import React from 'react'


const Breadcrum = ({ name }) => {
    return (
        <div>
            <div className="text-uppercase mb-4 bg-red-50 p-3 text-xs">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center text-sm font-medium uppercase">
                        <Link href="/" title="Back to the home page" className="text-gray-600 hover:text-gray-800 transition-colors truncate">
                            Home
                        </Link>
                        <span className="mx-2 text-gray-400">|</span>
                        <span className="text-gray-600 truncate">{name || ''}</span>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Breadcrum
