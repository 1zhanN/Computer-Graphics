import PIL
from PIL import Image, ImageGrab, ImageOps
import turtle
import numpy
import os


filename = r"C:\Users\izzug\Desktop\Docs\UNI\assingments and labs\Sem - 6\CG\lab2\binary_image.png"
img = Image.open(filename) # image reader
img = img.convert('1')  # coverts rgb -> single digit representation
pixel_size = img.size # saves (width, height)

x = [] 
y = []

w = []
h = []

for width in range(pixel_size[0]):
    for height in range(pixel_size[1]):
        pixel_color = img.load() #pixel access
        w.append(pixel_color[width, height]) # gets color for each pixel
    h.append(w)
    w = []  



# extracting black pixel position
for i in range(pixel_size[0]):
    for j in range(pixel_size[1]):
        if h[i][j] == 0:
            x.append(j)
            y.append(i)

# corners 

# top right
A = (max(x), min(y))
# bottom left
B = (min(x), max(y))
# top left
C = (min(x), min(y))
# bottom right
D = (max(x), max(y))

print(A, B, C, D)

# drawing lines (bit flip)
for i in range(C[1], B[1]):
    h[i][C[0]] = 0
for i in range(C[0], A[0]):
    h[C[1]][i] = 0
for i in range(A[1], D[1]):
    h[i][A[0]] = 0 
for i in range(B[0], D[0]):
    h[B[1]][i] = 0

# #  bitmap for visualize
# for i in h:
#     print(i)

# converting 225 and 0 into True and False for np operations
for width in range(pixel_size[0]):
    for height in range(pixel_size[1]):
        if h[width][height] > 0:
            h[width][height] = True
        else:
           h[width][height] = False

np_arr = numpy.array(h)
img2 = Image.fromarray(np_arr)

# directly converts into numpy array
# npimg = numpy.array(img)
# print(npimg)

#print(np_arr.shape)
img2 = img2.rotate(270, PIL.Image.Resampling.NEAREST, expand = 1)
img2 = ImageOps.mirror(img2)
img2.save('binary_image_detected.png')
img2.show()

