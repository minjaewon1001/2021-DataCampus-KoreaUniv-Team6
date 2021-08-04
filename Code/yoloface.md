# yoloface 사용법 - 이미지 속 face detection 코드
1. git bash를 열어 git clone 명령어를 통해 yoloface의 html을 원하는 경로에 저장한다.
```
git clone https://github.com/sthanhng/yoloface
```
2. 미리 학습된 weight파일을 다운받아 model-weights/ 경로에 넣어준다.

-> yoloface를 쓸 준비 완료

해당 문서의 yoloface는 매개변수를 받아 prompt창에서 실행시키는 방식이며, 얼굴을 검출하고 box형태로 출력해주기 때문에 우리가 쓸 수 있는 형식으로 모듈로 사용할 수 있도록 아래와 같이 yoloface.py를 수정하였다.

이미지를 받아서 얼굴을 인식하고 crop하여 그 crop이미지들을 return하는 함수로 만들어주었다.
## yoloface 를 이용한 face detection function
```
import sys
import os
import cv2

from utils import *

def facedetection(image):
#    image=cv2.imread('C:/Users/fmadu/Desktop/yoloface/samples/data2.jpg') #이미지 불러오기
    wind_name = 'face detection using YOLOv3'
    cv2.namedWindow(wind_name, cv2.WINDOW_NORMAL)

        # Create a 4D blob from a frame.
    blob = cv2.dnn.blobFromImage(image, 1 / 255, (IMG_WIDTH, IMG_HEIGHT),
                                    [0, 0, 0], 1, crop=False)

        # Sets the input to the network
    net.setInput(blob)

        # Runs the forward pass to get output of the output layers
    outs = net.forward(get_outputs_names(net))
    
        # Remove the bounding boxes with low confidence
    faces = post_process(image, outs, CONF_THRESHOLD, NMS_THRESHOLD)
#    print(faces)
#    print('[i] ==> # detected faces: {}'.format(len(faces)))

        # initialize the set of information we'll displaying on the frame
#    info = [
#        ('number of faces detected', '{}'.format(len(faces)))
#    ]
    
    crop=[]

    for i in range(len(faces)):
        crop.append(image[faces[i][1]:faces[i][1]+faces[i][3],faces[i][0]:faces[i][0]+faces[i][2]])
        #cv2.imwrite("cropped_"+str(i)+".jpg",crop[i])
    cv2.destroyAllWindows()
    return crop
```

본래 yoloface.py는 video나 webcam을 받고 얼굴을 인식할 수 있는 코드도 있었으나 현재 진행하는 프로젝트는 이미지에서만 얼굴을 인식하면 되므로 그부분의 코드는 모두 삭제하였다.
