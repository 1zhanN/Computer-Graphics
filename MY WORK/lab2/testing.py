import PIL
from PIL import Image, ImageGrab, ImageOps
import turtle
import numpy
import os

filename = "binary_image.png"
img = Image.open(filename) # image reader
img = numpy.asarray(img)
print(img)