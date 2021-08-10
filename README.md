# 2021-DataCampus-KoreaUniv-Team6

## K X-ray 프로젝트 (안면 인식 + 영상 속 인물 정보 제공 시스템)
![구조](https://user-images.githubusercontent.com/87637394/128809121-99388329-1575-4bc1-8ea0-1eaa0c8ada4b.JPG)
---
---
## 진행상황
0. 목표
- 현재 [6분 분량의 드라마 <스카이캐슬> 영상 (유튜브)](https://youtu.be/l9_V93YLKXM) 의 영상 속 인물 인식 구현을 목표로 진행 중
- ~21.08.06) 영상을 불러오는 부분부터 얼굴 감지, 인식까지 하나의 시스템으로 만드는 작업 완료
- (21.08.07~현재) k-pop 영상(뮤비, 라이브) 속 인물 인식 구현을 목표로 진행 중. 현재 블랙핑크(4인조 그룹)의 인식까지 성공. 방탄소년단(7)과 워너원(11)까지 추가 데이터 수집예정 

1. 데이터 수집
- 위의 영상 속에 나오는 인물 사진 100장씩 데이터 수집 완료 (총 1000장) / k-pop : 인물당 500장씩 수집
- 네이버, 구글 검색엔진 자동 크롤러 프로그램 Customize 완료
- 위의 영상에 대한 시스템 구현을 완료하면 차츰 다른 유형의 영상으로 영역을 넓혀 데이터를 수집할 예정.
## 
2. 데이터 전처리
##### 얼굴 부분만 Crop (데이터)
- Open CV Haar Cascade classifier 이용하여 face detection 진행 (성능이 조금 떨어지는 것 확인)
- Dlib 구현 완료 (역시 성능이 낮음)
- Vision API를 Customize 하여 사진을 받으면 자동으로 얼굴 부분만 crop하여 사진 파일로 save 하는 코드를 구현하였음. (한 장에 여러 얼굴이 있어도 crop 가능)
### 

###
##### ~~중복 데이터 처리 문제~~
- Histogram 함수를 이용하여 상관관계를 threshold로 설정하여 이미지 유사도 중심으로 중복 데이터를 처리할 수 있음.
- md5 해쉬값을 추출하여 중복 데이터를 처리하는 것도 조사 중에 있음.
##
3. 모델 학습 및 테스트 (Face Recognition)
##### 모델 선정
- Inception ResnetV1 : 속도는 느리지만 인식률이 높음. 그만큼 무거움
- MobileNetV1 : 속도는 빠르지만 인식률이 낮음. 가벼움 
- 08.09) Mobilenet V3 전이학습이나 v1을 개선시키는 방향으로 모델 성능을 높일 예정
##### 모델 학습
- Transfer Learning을 base로
- 모델의 가중치만 save 하여 재학습하는 것까지 구현
- 이미지에 대하여 학습하였고 테스트 결과 높은 정확도를 보임 (오차 1% 이내)
##### 테스트
- 영상 속에서 얼굴 부분만 Crop (face detection)
- pafy를 이용하여 youtube url을 받아오고 frame 단위로 받아와서 해당 프레임의 얼굴 부분만 추출하는 것 성공
- 다양한 open cv tool 중에서 yoloface가 가장 성능이 좋았음. => Customize하여 구현하는 것까지 성공하였음.
- face detection(yolo face) -> face recognition(inception resnet)
- 다만 Labeling이 되어 있지 않은 인물들에 대하여 분류를 하게 되는 모델 문제점 식별 (ex : '김고은'이 라벨링 되어 있지 않은데, 99%로 특정 다른 인물을 예측)
- 엑스트라를 어떻게 효과적으로 처리할 것인지에 대한 문제도 존재. -> 엑스트라 클래스를 추가한 결과 오히려 기존의 라벨링 된 인물을 인식하지 못하는 문제 발생. 추가x
- 클래스를 추가시키고 재학습 시키는 방안에 대해 조사했으나 어려움 인식 -> 모델의 수를 여러개로 두는 대안??
##
4. 데이터베이스 구성
- 아직 없음.
##
5. 시스템 구성 (영상속 얼굴 부분 crop - 모델에 넣어 test 를 연결)
- 어떠한 환경에서 영상을 재생할 것인가? Chrome Extension?? GUI?? Youtube API??? (고민과 조사 중에 있음.)

---
---
---


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

### openCV 
#### Haar-cascasde detection, SSD(Single Shot multibox Detector)
	>장점 : 인식속도가 가장 빨라 일반적인 PC환경에서도 실시간인식가능
	>단점 : 정면 얼굴이 아닌 경우, 인식률 많이 떨어짐
		오탐(False Positive)도 종종 발생하는 단점.

	>개선방안 : Eye detection을 추가하면 처리속도는 좀 느려지지만, 오탐은 많이 줄어든다.

### dlib
#### HoG(Histogram of Oriented Gradient), MMOD(Max-Margin Object Detection)
	>장점 : 높은 인식률
	>단점 : 인식속도 느려서 실시간 인식이 어렵고 GPU와 같은 Special HW가 요구됨. 얼굴을 모두 인식하지는 못함.


### Vision API

### yolo (yoloface)
> 2021.08.04

딥러닝을 이용한 object detection으로 성능이 좋고 속도가 빠르다.   
얼굴을 인식할 수 있도록 미리 학습시킨 가중치가 존재(yoloface)하여 이를 이용하여 얼굴을 감지하기로 하였다.   
yoloface.py를 우리가 쓸 시스템에 맞게 수정하였고 이는 code의 yoloface.md를 참고.
