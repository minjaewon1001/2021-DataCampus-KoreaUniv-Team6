# FaceNet: A Unified Embedding for Face Recognition and Clustering (CVPR 2015)

## 논문 정리 및 궁금한 점

***

#### Facenet의 전체적인 구성

1. Face Verification : 같은 사람인지 판별
2. Face Recognition : 누구인지 판별
3. Clustering : 공통된 사람 찾기

- 이미지 별로 Euclidean Embedding을 시행한다. Embedding은 L2-distance를 이용한다.
- Embedding은 Deep Convolution Network에 의해 이루어진다. (CNN 기반)
- Embedding의 최종 목적은 같은 사람일 경우 2개의 Embedded 값이 small distance를 갖게끔 하는 것이다.

---
###### 이러한 정교한 Embedding 방식으로 Facenet은 아래와 같은 방법으로 기능을 실현시킨다.
1. Face Verification : distance를 thresholding 시킨다. => 같은 사람이면 일정 수준 이하의 거리를 갖기 떄문
2. Face Recognition : 시스템에 새로운 test image 값을 집어넣을 경우 자동으로 모든 image들과의 distance 값을 산출한다. 그리고 k-NN classifier를 통해 k개의 가까운 class label로 분류한다.
3. Clustering : K-Means나 agglomerative (hierarchical 기반) 한 방식으로 Clustering을 수행하여 commom people의 group을 생성할 수 있다.
(test data에 해당 이미지의 label이 없더라도 clustering을 기반으로 분류할 수 있다는 뜻)

---
#### Related work
- previous work : deep networks using bottleneck layer
  * bottleneck layer(병목층)은 크기가 매우 큼 (1000개 차원) // PCA를 이용하여 줄여도 한계가 있는 방식
 
- 그에 반해 Facenet은 128개 차원 + Triplet based Loss function을 사용 (Loss function은 LMNN[large margin nearest neighbor] 기반

---
![facenet 기본 구조](https://user-images.githubusercontent.com/87637394/126889816-89c753d1-48d8-4b9a-afa5-585f0a7fa69a.JPG)

#### Deep Convolutional Network란?
[Pretrained 모델](https://github.com/davidsandberg/facenet#pre-trained-models)

- 기본적으로 SGD (Stochastic Gradient Descent) 방식을 기반으로 하는 CNN 모델이라고 할 수 있다.
- 2015년 기준 Facenet에서는 아래와 같은 구조의 Deep Convolutional Network를 사용 (1x1xd Convolution layer를 삽입했다는 것이 특징)
![facenet NN1 모델](https://user-images.githubusercontent.com/87637394/126889970-c7c5148f-f9bf-4fe1-8812-7a308d3afee2.JPG)

- 위의 링크와 같이 이것을 현실적으로 다시 모델링하는 작업은 난이도도 매우 높을 뿐만 아니라 시간, 비용적으로도 한계가 있음.
###### 따라서 본 프로젝트에서 적절한 형태의 pre-trained 모델을 선정해야 하고 (facenet이 아니더라도), 어떠한 방식으로 hyperparameter들을 tuning 할 수 있을지 고민해 보아야 함.
###### 위의 GITHUB 링크를 다시 살펴보면서 MTCNN 등 현재 구성되고 있는 형태의 pre-trained 모델들에 대해서도 살펴볼 필요성을 느꼈음.

- 본 논문에서 소개하는 구조는 크게 4가지 정도임. 그 중 NN1과 NN2 모델이 성능적으로 우수하였


#### Triplet Selection
- Triplet 가정 : 2개의 같은 label의 image 들 간의 거리가 다른 label을 가지는 image 간의 거리보다 작아야 함. (Triplet Loss function을 minimize 하는 것이 학습의 목표)
- 단, 대부분의 pair들은 triplet 가정을 만족시킬 것이므로 학습에 도움이 되는 pair들을 찾아야 함. 그 과정이 Triplet Selection

- 적절한 triplet 선정을 일일이 모두 계산하면 computational cost가 커 mini-batch 방식으로 선정함.



