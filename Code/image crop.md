# image crop
입력한 경로 속의 이미지에서 얼굴부분을 크롭하여 저장하는 코드이다. 
```
import numpy as np
import os
path_dir = 'C:/Data/data' # 경로 입력
file_list = os.listdir(path_dir)
file_list
```
* 이미지 속의 얼굴을 검출하는 함수
```
import cv2
import timeit
# 사진 검출기   
def imgDetector(img,cascade):
    
    # 영상 압축
    img = cv2.resize(img,dsize=None,fx=1.0,fy=1.0)
    # 그레이 스케일 변환
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) 
    # cascade 얼굴 탐지 알고리즘 
    results = cascade.detectMultiScale(gray,            # 입력 이미지
                                       scaleFactor= 1.5,# 이미지 피라미드 스케일 factor
                                       minNeighbors=5,  # 인접 객체 최소 거리 픽셀
                                       minSize=(20,20)  # 탐지 객체 최소 크기
                                       )
    #return results
    
    
    for box in results :
        x,y,w,h =box
       
        #print(x,y,w,h)
        #return [x,y,x+w,y+h] 
        #coo = [x,y,w,h]
    #return coo
        #x, y, w, h = box
        cv2.rectangle(img, (x,y), (x+w, y+h), (255,255,255), thickness=2)
        cv2.imshow('facenet',img)  
        cv2.waitKey(10000)
    return [x,y,x+w,y+h] 
    #return [one,two,three,four]
    #사진 출력        
    #cv2.imshow('facenet',img)  
    #cv2.waitKey(10000)
```
* 위의 함수를 통해 파일의 이미지를 크롭시키고 저장함
```
#cascade_filename = 'haarcascade_frontalface_alt.xml'
# 모델 불러오기
#cascade = cv2.CascadeClassifier(cascade_filename)

n = 1
for i in file_list:
    cascade_filename = 'C:/Data/haarcascade_frontalface_alt.xml'#xml파일 경로
    # 모델 불러오기
    cascade = cv2.CascadeClassifier(cascade_filename)
    try :
        img = cv2.imread("C:/Data/data/"+str(i)) #크롭할 사진이 있는 경로
        coor = imgDetector(img,cascade)
        crop = img[coor[1]:coor[3],coor[0]:coor[2]]
        cv2.imwrite("cropped"+str(n)+".jpg",crop) #크롭된 이미지의 이름
        n+=1
    except :
        print('예외 발생')#얼굴을 인식하지 못하는 경우 예외 발생을 출력하고 넘어감

# 가중치 파일 경로
#cascade_filename = 'haarcascade_frontalface_alt.xml'
# 모델 불러오기
#cascade = cv2.CascadeClassifier(cascade_filename)

# 영상 파일 
#cam = cv2.VideoCapture('sample.mp4')
# 이미지 파일
#img = cv2.imread('google_0010.jpg')
#img = img.astype(np.int16) # 8, 16
# 영상 탐지기
#videoDetector(cam,cascade)
# 사진 탐지기
#imgDetector(img,cascade)

#print(imgDetector(img,cascade))
#img[imgDetector[1]:imgDetector[3], imgDetector[0]:imgDetector[3]]
```
그러나 이 경우에는 얼굴의 정면만 인식할 수 있고 옆모습은 잘 인식하지 못한다. 또한 100개중에 49개정도만 추출된걸로 보면 성능이 좋은 편은 아닌 거 같다...
