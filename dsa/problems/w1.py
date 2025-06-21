'''
Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.

 

Example 1:

Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
Example 2:

Input: nums = [0]
Output: [0]
 

Constraints:

1 <= nums.length <= 104
-231 <= nums[i] <= 231 - 1
'''

''' 
Inital solution
class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        

        """
        arr - nums 
        move zeors to end  - keep the order 
        no copy of an array 
        return nums modified 

        check the array >=1 
        """
        length = len(nums)
        i = length

        # for num in nums:
        #     if num == 0:
        #         nums.remove(0)
            
        # print(nums)
        while(length > 0):
            if nums[length -1] == 0:
                nums.remove(0)
            length = length-1

        new_length = len(nums)

        s =  i- new_length

        while(s>0):
            nums.append(0)
            s -=1

        return nums



'''

def moveZeros(nums):
    i = 0
    j= 0
   
    while(i<len(nums)):
        print(i)
        if nums[j] == 0:
            nums.pop(j)
            
            nums=nums+[0]
            print('check',nums)
        else:
            j+=1
        i = i+1
    print(nums)

   

    return nums




# print(moveZeros([0,0,1]))
print(moveZeros([0,1,0,3,12]))
# print(moveZeros([0]))

            # l=0 r=1-->l=r
            # l=1 r=3 -->l=r
            # l=0,r=5 -->


