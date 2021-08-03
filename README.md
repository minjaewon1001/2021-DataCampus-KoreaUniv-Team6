# 2021-DataCampus-KoreaUniv-Team6

## A Thesis In Study
![image](https://user-images.githubusercontent.com/87224039/126871730-9a8d43cd-5b5c-4cbe-a7c8-a946f5de6ccc.png)

* 논문명 : FaceNet: A Unified Embedding for Face Recognition and Clustering
* 발행일 : 17 Jun 2015
* 저자 : Florian Schroff, Dmitry Kalenichenko, James Philbin
----------------------------------------------------   

## ILSVRC
* ILSVRC(ImageNet Large Scale Visual Recognition Challenge) :   
  ImageNet이라는 대용량 데이터셋을 활용하여 가장 높은 이미지 분류 성능을 내는 경진대회   
  ![image](https://user-images.githubusercontent.com/87224039/127144600-c51b7050-9c9a-477b-b8b2-b9084aa3478b.png)   
----------------------------------------------------   
* 논문 기반으로 공부한 모델 : AlexNet, VGGNet, GoogLeNet, ResNet, SENet   
  1. AlexNet ▶ 민병수, 양여름   
  2. VGGNet ▶ 양여름, 김희원   
  3. GoogLeNet ▶ 김희원, 조현근   
  4. ResNet ▶ 조현근, 민재원   
  5. SENet ▶ 민재원, 민병수   

  ![image](https://user-images.githubusercontent.com/67731178/127153824-f0f9f484-876d-4181-9ccf-d531f61e438b.png)   
----------------------------------------------------   
* 모델 실습 진행 :   
  ResNet      ▶ 양여름   
  ResNext     ▶ 민병수   
  YOLOv3      ▶ 김희원    
  InceptionV4 ▶ 민재원   
  SENet       ▶ 조현근   


## Face detection관련
21.08.03.14시30분
* SSD, MMOD, MTCNN은 현대적인 딥러닝 기반
* Haar-cascasde, HoG는 고전방법.
* SSD는 가장 빠름.

### openCV - Haar-cascasde detection, SSD(Single Shot multibox Detector)
	>장점 : 인식속도가 가장 빨라 일반적인 PC환경에서도 실시간인식가능
	>단점 : 정면 얼굴이 아닌 경우, 인식률 많이 떨어짐
		오탐(False Positive)도 종종 발생하는 단점.

	>개선방안 : Eye detection을 추가하면 처리속도는 좀 느려지지만, 오탐은 많이 줄어든다.

### dlib - HoG(Histogram of Oriented Gradient), MMOD(Max-Margin Object Detection)
	>장점 : 높은 인식률
	>단점 : 인식속도 느려서 실시간 인식이 어렵고 GPU와 같은 Special HW가 요구됨. 얼굴을 모두 인식하지는 못함.


### Vision API
