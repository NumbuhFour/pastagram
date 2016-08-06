import numpy as np
import cv2
from PIL import Image, ImageDraw

import sys

face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier('haarcascade_eye.xml')

img = cv2.imread(sys.argv[1])
h, w = img.shape[:2]
png = Image.new('RGBA',(w,h))
png.save('meatball-' + sys.argv[1], 'PNG')
meatball = Image.open('meatball.png')
meatballCV = cv2.imread('meatball.png')

#meatballGray = cv2.cvtColor(meatballCV, cv2.COLOR_BGR2GRAY)
#ret, orig_mask = cv2.threshold(meatballGray, 10, 255, cv2.THRESH_BINARY)

#orig_mask_inv = cv2.bitwise_not(orig_mask)

#meatballCV = meatballCV[:,:,0:3]
#origMeatballHeight, origMeatballWidth = meatballCV.shape[:2]

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

faces = face_cascade.detectMultiScale(gray, 1.8, 7)
for(x, y, w, h) in faces:
	cv2.rectangle(img, (x,y), (x+w, y+h), (255,0,0),2)
	roi_gray = gray[y:y+h, x:x+w]
	roi_color = img[y:y+h, x:x+w]
	eyes = eye_cascade.detectMultiScale(roi_gray)
	for(ex, ey, ew, eh) in eyes:
		cv2.rectangle(roi_color, (ex, ey), (ex+ew, ey+eh), (0,255,0), 2)

	for(ex, ey, ew, eh) in eyes:
		meatballWidth = ew
		meatballHeight = eh
		x1 = ex
		x2 = ex + ew
		y1 = ey
		y2 = ey + eh
		if x1 < 0:
                	x1 = 0
            	if y1 < 0:
                	y1 = 0
            	if x2 > w:
                	x2 = w
            	if y2 > h:
                	y2 = h

		meatballWidth = x2 - x1
		meatballHeight = y2 - y1
		meatball = meatball.resize((ew, eh), Image.ANTIALIAS)
		#newMeatball = cv2.resize(meatballCV, (meatballWidth, meatballHeight), interpolation = cv2.INTER_AREA)
		offset = (x1 + x, y1 + y)
		meatballEyes = Image.open("eye.png")
		png.paste(meatball, offset)
		png.save('meatball-' + sys.argv[1])
		#mask = cv2.resize(orig_mask, (meatballWidth, meatballHeight), interpolation = cv2.INTER_AREA)
		#mask_inv = cv2.resize(orig_mask_inv, (meatballWidth, meatballHeight), interpolation = cv2.INTER_AREA)
	#	roi = roi_color[y1:y2, x1:x2]

	#	roi_bg = cv2.bitwise_and(roi, roi, mask = mask_inv)
		
	#	roi_fg = cv2.bitwise_and(newMeatball, newMeatball, mask = mask)
		
	#	dst = cv2.add(roi_bg, roi_fg)

	#	roi_color[y1:y2, x1:x2] = dst

#cv2.imshow('img', img)
#cv2.waitKey(0)
#cv2.destroyAllWindows()
