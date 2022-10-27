import numpy as np
import math

x_coordinate1 = np.arange(0, 100, 3)
y_coordinate1 = np.zeros(len(x_coordinate1))
print(x_coordinate1, y_coordinate1)

for i in range(len(x_coordinate1)):
   # print(x_coordinate1[i]*math.pi / 100)
    print(math.exp(x_coordinate1[i]))