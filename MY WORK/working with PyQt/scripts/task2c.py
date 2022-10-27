import numpy as np
import math
from PyQt5 import QtCore, QtGui, QtWidgets
import pyqtgraph as pg
from pyqtgraph import PlotWidget, mkPen


class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(934, 525)
        #playing with position of the window
       
        #MainWindow.setGeometry(0,0, 0,0)
        #x= x - self.width()//2
        #y = y - self.height()//2
        

        # viewport/centralwidget inside main window
        # centralwidget is a container where every other component is nested within
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")

        # Search Bar creation and positioning
        self.verticalLayoutWidget = QtWidgets.QWidget(self.centralwidget)
        self.verticalLayoutWidget.setGeometry(QtCore.QRect(140, 0, 591, 91))
        self.verticalLayoutWidget.setObjectName("verticalLayoutWidget")

        self.verticalLayout = QtWidgets.QVBoxLayout(self.verticalLayoutWidget)
        self.verticalLayout.setContentsMargins(0, 0, 0, 0)
        self.verticalLayout.setObjectName("verticalLayout")
        
        # text browser component
        self.textBrowser_3 = QtWidgets.QTextBrowser(self.verticalLayoutWidget)
        self.textBrowser_3.setStyleSheet("background-color:rgba(3, 68, 255, 255)")
        self.textBrowser_3.setObjectName("textBrowser_3")

        self.verticalLayout.addWidget(self.textBrowser_3)
        
        # Menu Bar creation and positioning
        self.horizontalLayoutWidget = QtWidgets.QWidget(self.centralwidget)
        self.horizontalLayoutWidget.setGeometry(QtCore.QRect(0, 0, 141, 561))
        self.horizontalLayoutWidget.setObjectName("horizontalLayoutWidget")
        self.menu = QtWidgets.QHBoxLayout(self.horizontalLayoutWidget)
        self.menu.setContentsMargins(0, 0, 0, 0)
        self.menu.setObjectName("menu")
        
        # nested widget container
        self.widget_2 = QtWidgets.QWidget(self.horizontalLayoutWidget)
        self.widget_2.setObjectName("widget_2")
        
        self.graphicsView_2 = PlotWidget(self.widget_2)
        self.graphicsView_2.setGeometry(QtCore.QRect(0, 70, 141, 411))
        self.graphicsView_2.setObjectName("graphicsView_2")
        
        # text browser component
        self.textBrowser = QtWidgets.QTextBrowser(self.widget_2)
        self.textBrowser.setGeometry(QtCore.QRect(0, 0, 141, 71))
        self.textBrowser.setStyleSheet("background-color:rgb(0, 0, 255)")
        self.textBrowser.setObjectName("textBrowser")
        
        # no idea what 
        self.menu.addWidget(self.widget_2)
        self.horizontalLayoutWidget_2 = QtWidgets.QWidget(self.centralwidget)
        self.horizontalLayoutWidget_2.setGeometry(QtCore.QRect(730, 0, 201, 561))
        self.horizontalLayoutWidget_2.setObjectName("horizontalLayoutWidget_2")
        
        # friend's list creation and positioning
        self.friends = QtWidgets.QHBoxLayout(self.horizontalLayoutWidget_2)
        self.friends.setContentsMargins(0, 0, 0, 0)
        self.friends.setObjectName("friends")
        self.textBrowser_4 = QtWidgets.QTextBrowser(self.horizontalLayoutWidget_2)
        self.textBrowser_4.setStyleSheet("background-color:qlineargradient(spread:pad, x1:0, y1:0, x2:1, y2:0, stop:0 rgba(3, 68, 255, 255), stop:1 rgba(255, 255, 255, 255))")
        self.textBrowser_4.setObjectName("textBrowser_4")
        self.friends.addWidget(self.textBrowser_4)
        self.widget = QtWidgets.QWidget(self.centralwidget)
        self.widget.setGeometry(QtCore.QRect(139, 89, 591, 401))
        self.widget.setObjectName("widget")
        
        # graph object
        self.graphicsView = PlotWidget(self.widget)
        self.graphicsView.setGeometry(QtCore.QRect(10, 10, 571, 331))
        self.graphicsView.setObjectName("graphicsView")

        # button object
        self.pushButton = QtWidgets.QPushButton(self.widget)
        self.pushButton.setGeometry(QtCore.QRect(10, 350, 281, 41))

        # button visuals
        font = QtGui.QFont()
        font.setFamily("Verdana")
        font.setPointSize(16)
        self.pushButton.setFont(font)
        self.pushButton.setObjectName("pushButton")
        self.pushButton_2 = QtWidgets.QPushButton(self.widget)
        self.pushButton_2.setGeometry(QtCore.QRect(300, 350, 281, 41))
        font = QtGui.QFont()
        font.setFamily("Verdana")
        font.setPointSize(16)
        self.pushButton_2.setFont(font)
        self.pushButton_2.setObjectName("pushButton_2")
       
        MainWindow.setCentralWidget(self.centralwidget)
        self.menubar = QtWidgets.QMenuBar(MainWindow)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 934, 21))
        self.menubar.setObjectName("menubar")
        MainWindow.setMenuBar(self.menubar)
        self.statusbar = QtWidgets.QStatusBar(MainWindow)
        self.statusbar.setObjectName("statusbar")
        MainWindow.setStatusBar(self.statusbar)

        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)
        
        # button connection
        self.pushButton.clicked.connect(lambda: self.draw())
        self.pushButton_2.clicked.connect(lambda: self.clear())
        
        # bg-color
        self.graphicsView.setBackground('#ffffff')
        self.graphicsView_2.setBackground('#ffffff')
        

    def draw(self):
        
        # graph 1
        x_coordinate1 = np.arange(0, 100, 3)
        y_coordinate1 = np.zeros(len(x_coordinate1))
        y_coordinate2 = np.zeros(len(x_coordinate1))

        for i in range(len(x_coordinate1)):
            x_rad = x_coordinate1[i]*math.pi / 100
            y_coordinate1[i] = 300 - 100*math.cos (2*x_rad) +30*math.cos(4*x_rad) + 6*math.cos(6*x_rad)
            y_coordinate2[i] = 1/y_coordinate1[i]

        graphcolor = pg.mkPen(color=(0, 0, 217))
        self.graphicsView.plot(x=x_coordinate1, y=y_coordinate2, pen=graphcolor)


        # graph 2
        x_coordinate2 = np.arange(0, 10, 0.005)
        y_coordinate3 = np.zeros(len(x_coordinate2))

        for i in range(len(x_coordinate2)):
            y_coordinate3[i] = math.exp(-x_coordinate2[i])* math.cos(2*math.pi*x_coordinate2[i])

        self.graphicsView_2.plot(x=x_coordinate2, y=y_coordinate3, pen=graphcolor)
    
    def clear(self):
        self.graphicsView.clear()
        self.graphicsView_2.clear()

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "MainWindow"))
        self.textBrowser_3.setHtml(_translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:\'MS Shell Dlg 2\'; font-size:8.25pt; font-weight:400; font-style:normal;\">\n"
"<p align=\"center\" style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:12pt; font-weight:600; color:#ffffff; vertical-align:sub;\">Search Bar ______________ </span></p></body></html>"))
        self.textBrowser.setHtml(_translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:\'MS Shell Dlg 2\'; font-size:8.25pt; font-weight:400; font-style:normal;\">\n"
"<p align=\"center\" style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:12pt; font-weight:600; color:#ffffff; vertical-align:sub;\">Settings and Public Groups</span></p>\n"
"<p align=\"center\" style=\"-qt-paragraph-type:empty; margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px; font-size:12pt; font-weight:600; color:#ffffff; vertical-align:sub;\"><br /></p></body></html>"))
        self.textBrowser_4.setHtml(_translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:\'MS Shell Dlg 2\'; font-size:8.25pt; font-weight:400; font-style:normal;\">\n"
"<p align=\"center\" style=\"-qt-paragraph-type:empty; margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><br /></p>\n"
"<p align=\"center\" style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:12pt; font-weight:600; color:#ffffff; vertical-align:super;\">Friend\'s List and Group-Chats</span></p></body></html>"))
        self.pushButton.setText(_translate("MainWindow", "Draw"))
        self.pushButton_2.setText(_translate("MainWindow", "Clear"))



if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QMainWindow()
    ui = Ui_MainWindow()
    ui.setupUi(MainWindow)
    MainWindow.setWindowTitle("Izhan Nadeem #B19102048")
    MainWindow.show()
    sys.exit(app.exec_())
