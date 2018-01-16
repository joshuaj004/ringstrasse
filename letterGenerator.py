from PIL import Image, ImageDraw, ImageFont
import string

for i in range(len(string.ascii_letters)):
	W, H = (44,64)
	img = Image.new('RGB', (W,H), color=(255,255,255))
	d = ImageDraw.Draw(img)
	fnt = ImageFont.truetype('C:/Windows/Fonts/SF Fortune Wheel.ttf', 45)
	w, h = fnt.getsize(string.ascii_letters[i])
	d.text(((W-w)/2,(H-h)/2), string.ascii_letters[i], font=fnt, fill=(0,0,0))
	img.save("letters/"+string.ascii_letters[i]+".png")
