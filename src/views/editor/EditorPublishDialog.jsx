/************************************************************ IMPORTS ************************************************************/

import React, { memo } from 'react';
import { Copy } from 'lucide-react';
import fb from '../../assets/fb.png';
import gmail from '../../assets/gmail.png';
import reddit from '../../assets/reddit.png';
import twitter from '../../assets/twitter.png';
import telegram from '../../assets/telegram.png';
import whatsapp from '../../assets/whatsapp.png';
import { Input } from '../../components/input';
import { Label } from '../../components/label';
import { Button } from '.././../components/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from '../../components/dialog';
import { WhatsappShareButton, FacebookShareButton, TwitterShareButton, TelegramShareButton, RedditShareButton, EmailShareButton } from 'react-share';

/************************************************************ IMPORTS ************************************************************/

const EditorPublish = ({ showDialogURI, setShowDialogURI, profolyoURI, copyToClipBoardConfirm, closeDialogURI, copyToClipboard }) => {
  const shareContent = `Hey! Check out my new Profolyo :\n${profolyoURI}`;

  return (
    <Dialog open={showDialogURI} onOpenChange={setShowDialogURI}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Profolyo</DialogTitle>
          <DialogDescription className="text-zinc-600">Showcase and invite your friends to Profolyo!</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={profolyoURI} readOnly />
          </div>
          <Button type="submit" size="sm" className="px-3 dark" onClick={() => copyToClipboard(profolyoURI)}>
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-between">
          <TelegramShareButton url={`${shareContent}?ref=telegram`}>
            <img src={telegram} alt="telegram" className="w-12 h-12 rounded" />
          </TelegramShareButton>
          <EmailShareButton url={`${shareContent}?ref=gmail`}>
            <img src={gmail} alt="gmail" className="w-12 h-12 rounded" />
          </EmailShareButton>
          <FacebookShareButton url={`${shareContent}?ref=fb`}>
            <img src={fb} alt="fb" className="w-12 h-12 rounded" />
          </FacebookShareButton>
          <RedditShareButton url={`${shareContent}?ref=reddit`}>
            <img src={reddit} alt="reddit" className="w-12 h-12 rounded" />
          </RedditShareButton>
          <TwitterShareButton url={`${shareContent}?ref=twitter`}>
            <img src={twitter} alt="twitter" className="w-12 h-12 rounded" />
          </TwitterShareButton>
          <WhatsappShareButton url={`${shareContent}?ref=whatsapp`}>
            <img src={whatsapp} alt="whatsapp" className="w-12 h-12 rounded" />
          </WhatsappShareButton>
        </div>
        {copyToClipBoardConfirm && <p className="text-xs text-green-700">Link copied to clipboard!</p>}
        <DialogClose asChild>
          <Button type="button" variant="profolyoDark" onClick={closeDialogURI}>
            Go To Dashboard
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default memo(EditorPublish);
