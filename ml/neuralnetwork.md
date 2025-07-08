## Neural network that learns to predict the output of the XOR function 

<!--  
Input(x1,x2) --- ouput 

0,0 --- 0
0,1 --- 1
1,0 --- 1
1,1 --- 0





-->


## Neuron - just a function that takes a number, applies a transformation, and gives an output. In neural nets, we often use sigmoid function

'''
def sigmoid(x):
    return 1/ (1 +np.exp(-x))

'''