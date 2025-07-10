## Neural network that learns to predict the output of the XOR function 

```
Input(x1,x2) --- ouput 

0,0 --- 0
0,1 --- 1
1,0 --- 1
1,1 --- 0

```





## Neuron - just a function that takes a number, applies a transformation, and gives an output. In neural nets, we often use sigmoid function

```
def sigmoid(x):
    return 1/ (1 +np.exp(-x))

```

## Weight - each input gets multiplied by a weight. The network will learn the best values of these weights to make accurate predictions.

```
output = input * weight
```

## Forward propagation - this is just passing the input through the network:
- Multiply input by weight
- add bias
- Pass through activation function

## Back propagation - this is how the network learns . Afer seeign the output is wrong, it goes back and adjusts the weights to do better next time. 


