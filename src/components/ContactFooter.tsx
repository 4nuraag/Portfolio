'use client';

import React from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';

export default function ContactFooter() {
    return (
        <footer id="contact-section" className="w-full text-foreground py-16 px-6 md:px-16 border-t border-border pb-32 md:pb-16">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-2">Let's Connect</h3>
                    <p className="text-muted-foreground max-w-md">
                        Open for collaborations and new opportunities.
                        <br />
                        Feel free to reach out!
                    </p>
                </div>

                <div className="flex gap-6">
                    <a href="mailto:anuraag.vinod@gmail.com" className="hover:text-primary transition-colors text-foreground/80 hover:scale-110 transform duration-300">
                        <Mail size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/anuraagvk/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-foreground/80 hover:scale-110 transform duration-300">
                        <Linkedin size={24} />
                    </a>
                    <a href="https://www.instagram.com/4nuraag.blend/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-foreground/80 hover:scale-110 transform duration-300">
                        <Instagram size={24} />
                    </a>
                </div>
            </div>

            <div className="mt-12 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Anuraag Vinod Kumar. All rights reserved.
            </div>
        </footer>
    );
}
