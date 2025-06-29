
import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import OnlineStatus from './OnlineStatus';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      // Rediriger vers WhatsApp Business avec le numéro correct
      const phoneNumber = "261348901234"; // Remplacez par votre vrai numéro
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      setMessage('');
      setIsOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
            aria-label="Ouvrir le chat"
          >
            <MessageCircle className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
          </Button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <Card className="w-80 shadow-2xl border-0 animate-scale-in">
            <CardHeader className="bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Chat avec nous</CardTitle>
                  <OnlineStatus />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-8 w-8"
                  aria-label="Fermer le chat"
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
                  onKeyPress={handleKeyPress}
                  placeholder="Tapez votre message..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-vilo-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  rows={3}
                  aria-label="Message"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="w-full bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700 disabled:opacity-50"
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
