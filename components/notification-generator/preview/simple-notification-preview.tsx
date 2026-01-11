"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { useMemo } from "react";
import { MinecraftText } from "./minecraft-text-parser";
import type { MinecraftPreviewProps } from "../types";

export function SimpleNotificationPreview({ notification }: MinecraftPreviewProps) {
    const hasContent = notification.chat || notification.actionbar || notification.title || notification.subtitle;

    const chatLines = useMemo(() => {
        if (!notification.chat) return [];
        return notification.chat.split("\n").filter(line => line.trim());
    }, [notification.chat]);

    return (
        <div className="w-full space-y-3 p-6">
            {!hasContent && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                >
                    <div className="mb-3 rounded-full bg-gray-100 p-4 dark:bg-gray-800">
                        <MessageSquare className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="mb-1 font-medium text-gray-900 text-base dark:text-white">
                        No notification configured
                    </h3>
                    <p className="text-gray-500 text-xs dark:text-gray-400">
                        Configure a notification to see a preview
                    </p>
                </motion.div>
            )}

            <AnimatePresence mode="sync">
                {/* Chat Messages */}
                {chatLines.length > 0 && (
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-2"
                    >
                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider dark:text-gray-400">
                            Chat
                        </div>
                        <div className="space-y-1.5">
                            {chatLines.map((line, index) => (
                                <div
                                    key={index}
                                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 font-minecraft dark:border-gray-700 dark:bg-gray-800/50"
                                    style={{
                                        fontSize: "14px",
                                        lineHeight: "16px",
                                    }}
                                >
                                    <MinecraftText text={line} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Action Bar */}
                {notification.actionbar && (
                    <motion.div
                        key="actionbar"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, delay: 0.05 }}
                        className="space-y-2"
                    >
                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider dark:text-gray-400">
                            Action Bar
                        </div>
                        <div
                            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-center font-minecraft dark:border-gray-700 dark:bg-gray-800/50"
                            style={{
                                fontSize: "14px",
                                lineHeight: "16px",
                            }}
                        >
                            <MinecraftText text={notification.actionbar} />
                        </div>
                    </motion.div>
                )}

                {/* Title & Subtitle */}
                {(notification.title || notification.subtitle) && (
                    <motion.div
                        key="title"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        className="space-y-2"
                    >
                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider dark:text-gray-400">
                            Title
                        </div>
                        <div className="space-y-2 rounded-lg border border-gray-200 bg-white px-4 py-4 text-center dark:border-gray-700 dark:bg-gray-800/50">
                            {notification.title && (
                                <div
                                    className="font-minecraft font-bold"
                                    style={{
                                        fontSize: "28px",
                                        lineHeight: "32px",
                                    }}
                                >
                                    <MinecraftText text={notification.title} />
                                </div>
                            )}
                            {notification.subtitle && (
                                <div
                                    className="font-minecraft"
                                    style={{
                                        fontSize: "16px",
                                        lineHeight: "20px",
                                    }}
                                >
                                    <MinecraftText text={notification.subtitle} />
                                </div>
                            )}
                            {(notification.fadeIn || notification.stay || notification.fadeOut) && (
                                <div className="mt-3 flex items-center justify-center gap-3 border-gray-200 border-t pt-3 text-gray-500 text-[10px] dark:border-gray-700 dark:text-gray-400">
                                    <span>{notification.fadeIn || "0s"}</span>
                                    <span>•</span>
                                    <span>{notification.stay || "0s"}</span>
                                    <span>•</span>
                                    <span>{notification.fadeOut || "0s"}</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
