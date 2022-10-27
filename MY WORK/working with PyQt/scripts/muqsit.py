from PyQt5.QtWidgets import QApplication, QWidget, QVBoxLayout, QHBoxLayout
import pyqtgraph as pg
import math
x=[]
y=[]
for i in range(-15,15,1):
    q = 300 - (100*math.cos((2*math.pi*i)/100)) + (30*math.cos((4*math.pi*i)/100)) + (6*math.cos((6*math.pi*i)/100))
    x.append(i)
    y.append(1/q)
    
a = pg.plot(x, y, pen='r')
b = pg.plot(x, y, pen='b')
c = pg.plot(x, y, pen='g')
d = pg.plot(x, y, pen='y')

window = QWidget()  #container
window.setWindowTitle("Izhan's window")

# widget on base layout
base_layout = QVBoxLayout()
base_layout.addWidget(a)
a.setMaximumHeight(100)

# second layout as container 
layout1 = QHBoxLayout()
base_layout.addLayout(layout1)

# nested horizontal layouts
h1 = QHBoxLayout()
h1.addWidget(b)
layout1.addLayout(h1)
b.setMaximumWidth(150)

h2 = QHBoxLayout()
h2.addWidget(c)
layout1.addLayout(h2)


h3 = QHBoxLayout()
h3.addWidget(d)
layout1.addLayout(h3)
d.setMaximumWidth(200)




# embeds base layout object on top of window widget
window.setLayout(base_layout)

# display
window.show()
