import random

#create Pseudo-random numbers generate function

def Generated_lotto_draw(): #function name
    numbers =  sorted(random.sample(range(1, 51), 6))
    #list that generate 6 unique numbers between 1 to 51
    return ', '.join(str(numbers) for num in numbers) 
    #return a string with containing the lotto numbers with ',' seperator
