
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Bot, Send, Settings, User, X, Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { AIAgent, AgentResponse, TOOLS } from "@/lib/ai-agent";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

const STORAGE_KEY = "gemini_api_key";

interface Message {
    role: "user" | "ai";
    text: string;
}

export function AIChatOverlay() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [apiKey, setApiKey] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { role: "ai", text: t('ai.welcome') }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [agent, setAgent] = useState<AIAgent | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const location = useLocation();
    const navigate = useNavigate();
    const { toast } = useToast();

    // Load API Key on mount
    useEffect(() => {
        const envKey = import.meta.env.VITE_GEMINI_API_KEY;
        const storedKey = localStorage.getItem(STORAGE_KEY);
        const keyToUse = envKey || storedKey;

        if (keyToUse) {
            setApiKey(keyToUse);
            setAgent(new AIAgent(keyToUse));
        }
    }, []);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const handleSaveKey = () => {
        if (apiKey.trim()) {
            localStorage.setItem(STORAGE_KEY, apiKey);
            setAgent(new AIAgent(apiKey));
            toast({
                title: t('ai.key_saved'),
                description: t('ai.key_desc'),
            });
        }
    };

    const executeTool = async (toolCall: any) => {
        if (!toolCall) return;

        if (toolCall.tool === TOOLS.NAVIGATE) {
            const path = toolCall.args.path;
            if (path) {
                navigate(path);
                return `Navigated to ${path}`;
            }
        } else if (toolCall.tool === TOOLS.GET_PAGE_CONTENT) {
            return document.body.innerText;
        }
        return "Tool executed successfully.";
    };

    const handleSend = async () => {
        if (!input.trim() || !agent) {
            if (!agent) {
                toast({
                    title: t('ai.setup_req'),
                    description: t('ai.setup_desc'),
                    variant: "destructive"
                });
            }
            return;
        }

        const userMessage = input;
        setInput("");
        setMessages(prev => [...prev, { role: "user", text: userMessage }]);
        setIsLoading(true);

        try {
            const result = await agent.sendMessage(userMessage, document.body.innerText.substring(0, 2000)); // Limit context to 2k chars

            setMessages(prev => [...prev, { role: "ai", text: result.text }]);

            if (result.toolCall) {
                // Execute tool
                const toolResult = await executeTool(result.toolCall);

                // Optionally allow AI to confirm execution? For now, we just proceed.
                if (result.toolCall.tool === TOOLS.NAVIGATE) {
                    // Let the user know specifically
                    setMessages(prev => [...prev, { role: "ai", text: `(Action: Navigating to ${result.toolCall.args.path})` }]);
                }
            }

        } catch (error) {
            setMessages(prev => [...prev, { role: "ai", text: t('ai.error') }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg p-0 z-50 bg-transparent hover:bg-transparent transition-all duration-300 hover:scale-110 overflow-hidden"
            >
                <img
                    src="/chatbot_icon_new.png"
                    alt="Chat"
                    className="h-full w-full object-cover"
                />
            </Button>
        );
    }

    return (
        <Card className="fixed bottom-4 right-4 w-[350px] h-[500px] shadow-2xl z-50 flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-300 border-primary/20 backdrop-blur-sm bg-background/95">
            <CardHeader className="p-3 border-b flex flex-row items-center justify-between space-y-0 bg-muted/30">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full overflow-hidden border border-primary/20">
                        <img
                            src="/chatbot_icon_new.png"
                            alt="AI"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <CardTitle className="text-sm font-medium">{t('ai.agent')}</CardTitle>
                </div>
                <div className="flex items-center gap-1">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Settings className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{t('ai.settings')}</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="apiKey">{t('ai.api_key')}</Label>
                                    <Input
                                        id="apiKey"
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                        type="password"
                                        placeholder={t('ai.placeholder_key')}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {t('ai.storage_note')}
                                    </p>
                                </div>
                                <Button onClick={handleSaveKey}>{t('ai.save_key')}</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col min-h-0">
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`
                            max-w-[80%] rounded-lg px-3 py-2 text-sm
                            ${msg.role === 'user'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted border border-border'}
                        `}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-muted border border-border rounded-lg px-3 py-2 text-sm flex items-center gap-1">
                                    <Sparkles className="h-3 w-3 animate-spin" />
                                    {t('ai.thinking')}
                                </div>
                            </div>
                        )}
                        <div ref={scrollRef} />
                    </div>
                </ScrollArea>
                <div className="p-3 border-t bg-background">
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        className="flex items-center gap-2"
                    >
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t('ai.placeholder_input')}
                            className="flex-1"
                        />
                        <Button type="submit" size="icon" disabled={isLoading}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
}
