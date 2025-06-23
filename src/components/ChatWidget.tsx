
import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      // Rediriger vers WhatsApp Business
      const whatsappUrl = `https://wa.me/YOUR_PHONE_NUMBER?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      setMessage('');
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
            size="icon"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </Button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <Card className="w-80 shadow-2xl border-0 animate-scale-in">
            <CardHeader className="bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Chat avec nous</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Bonjour ! Comment pouvons-nous vous aider aujourd'hui ?
              </div>
              <div className="space-y-3">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tapez votre message..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-vilo-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  rows={3}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="w-full bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer sur WhatsApp
                </Button>
              </div>
              <div className="text-xs text-gray-500 text-center">
                Nous répondons généralement en moins de 30 minutes
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default ChatWidget;
