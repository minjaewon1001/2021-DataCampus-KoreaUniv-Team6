* 논문 공부 & 요약   


# FaceNet : 얼굴인식 및 클러스터링을 위한 통합된 임베딩(내장)    

## 1. Abstract & Introduction  (개요 & 소개)
최근 얼굴 인식 분야에서 상당한 발전에도 불구하고, 규모에 맞게 얼굴 검증과 인식을 효율적으로 구현하는 것은 현재 접근법에 심각한 문제를 제기하고 있다.

* 기존의 deep networks 기반의 얼굴인식 :
  - CNN의 bottle-neck layer(중간병목층)을 취하는데, 이게 '간접적', '비효율성'이라는 단점을 내포함.
  - 2D, 3D로 aligned(정렬된)된 얼굴 이미지를 필요로 함.   


* FaceNet :
  - 기존 방식과 대조적으로, LMNN에 기초한 triplet based loss function (3중 손실 함수)를 사용하여 128차원으로 임베딩하여 학습시킴.

        * 기존 접근 방법에서는 CNN의 중간 단계 레이어의 출력값을 사용한다. 이는 중간 레이어를 사용하기 때문에 간접적이며, 비효율적이고 차원이 크다는 문제가 발생한다.
        * FaceNet 논문에서는 Direct하게 저차원(128-D)의 임베딩을 적절히 구현하는 방법을 제시한다.
        * 저차원의 벡터를 학습 시키는 방법으로 Triplet loss를 제안한다.
  - 이미지를 2D, 3D로 aligned하는 과정 없이 높은 성능.
     (물론, 얼굴크기에 맞게 잘라주는 과정은 필요하고 추가적인 aligned 과정은 성능을 올려줌)
  - 얼굴 이미지로부터 얼굴 유사성과 직접적으로 대응하는 유클리드 공간의 관계를 직접적으로 학습시킨다.
  - 이 논문에서는 Deep Convolution Network를 이용하여, 유클리드 임베딩을 학습한다.
  - 여기서 임베딩 공간의 L2 distance는 얼굴 유사도와 곧바로 일치하도록 학습시킨다.
     (같은 사람의 얼굴은 짧은 거리, 다른 사람의 얼굴은 긴 거리)
  - 이 논문은 3가지를 소개한다.
     1. Face verification (같은 사람인지) >> 두 임베딩 사이의 거리를 임계화(그림1. 처럼 임계값(1.1)기준)
     2. Face recognition (이 사람이 누구인지) >> knn분류
     3. Face clustering (이 얼굴들 중 공통인물 찾기) >> k-means 또는 agglomerative clustering과 같은 기존 기술 사용


* 논문의 나머지 개요
  - Section 2 : 이 분야의 문헌을 검토
  - Section 3.1 : 삼중손실(triplet loss)을 정의
  - Section 3.2 : 새로운 삼중선택(triplet selection)과 훈련절차를 설명
  - Section 3.3 : 사용된 model의 아키텍쳐(architecture)를 설명
  - Section 4, 5 : 임베딩의 몇 가지 정량적 결과를 제시하고 일부 클러스터링 결과를 질적으로 살펴본다.

## 2. Related Work (관련 문헌)
이 논문에서는 최근에 컴퓨터 비전 커뮤니티에서 큰 성공을 거두기 위해 사용되었던 두가지 deep network architectures를 살펴봅니다. 둘 다 deep convolutional networks입니다.

* 첫 번째 architecture, Zeiler&Fergus [22] 모델
  - multiple interleaved layers of convolutions(다중 인터리브된 변환 계층)
    * Multiple interleaved layers 란? 
       = 다중 인터리브 층.
          - interleave(인터리브)란? :
         1) 사전적 의미는 ‘끼워넣기’이다.
         2) 인터리브는 성능을 높이기 위해 데이터가 서로 인접하지 않도록 배열하는 방법이다.
         3) 정확히 설명은 못하겠지만… 일단 인터리브 CNN은 여러 layer 유형을 계층별로 ‘직렬’로 적용하는 네트워크이고,
         4) 이에 비해 “inception(인셉션)”유형 CNN에서는 여러 layer 유형을 병렬로 적용하는거라카네..
         5) [참고링크](https://datascience.stackexchange.com/questions/15214/what-are-interleaved-layers-of-convolutions)

  - non-linear activations(비선형 활성화)
    * [참고링크](https://subinium.github.io/introduction-to-activation/)

  - local response normalizations(로컬 응답 정규화)
    * [참고링크](https://neurowhai.tistory.com/134)

  - max pooling layers(최대 layer들 모으기)
    * [참고링크](https://hobinjeong.medium.com/cnn%EC%97%90%EC%84%9C-pooling%EC%9D%B4%EB%9E%80-c4e01aa83c83)


* 두 번째 architecture, Szegdy 등의 Inception 모델
최근 ImageNet 2014의 성공적 접근법으로 사용되었던 Szegdy 등의 Inception 모델을 기반으로 합니다[16].
>> 이 부분 너무 광범위해서.. section2. 관련 문헌 part는 따로 빼서 기술하려함. 조금만 참아주세용 :)   


## 3. Method
### 3.0. Triplet network (삼중네트워크)
* Triplet network는 동일한 네트워크 3개와
* 기준이 되는 클래스에 속하는 샘플 x와
* 다른 클래스에 속하는 negative smaple과
* 같은 클래스에 속하는 positive smaple로 구성된다.
* 일반적으로 손실함수가 한 개의 input sample을 받는데 비해 삼중항 손실 함수는 위의 3개의 입력을 받으며, loss또한 3개의 입력에 대해 계산한다.

![image](https://user-images.githubusercontent.com/87224039/126898719-bef4cd40-5623-4c1b-8fb2-bc81cf9dd002.png)



### 3.1. Triplet Loss (삼중손실)
* Triplet loss는 anchor sample, positive sample, negative sample 3개의 샘플에 대해 loss 계산을 수행한다.
* 앞서 말했던 저차원 벡터를 학습시키는 방법으로 사용한다.
* 같은 사진은 가까운 거리에, 다른 사진은 먼 거리에 있도록 유사도를 벡터 사이의 거리와 같아지게 하려는 목적이며, 이를 'loss'로 나타낸다.   

![image](https://user-images.githubusercontent.com/87224039/126898754-a80b8b06-b2f1-4345-bd87-de666f4c5190.png)   

* 같은 사진을 가깝게, 다른 사진을 멀게 하는 것을 표현한 식이 다음과 같다.   
![image](https://user-images.githubusercontent.com/87224039/126898766-fff983ac-eb83-4d89-93ad-c588f69f8d6e.png)   

* 이를 Loss Function으로 나타내면 다음과 같다.   
![image](https://user-images.githubusercontent.com/87224039/126898775-d536196a-db4b-43d2-966a-b1d961a4cce5.png)   


### 3.2. Triplet selection (삼중선택)   

![image](https://user-images.githubusercontent.com/87224039/126898812-d60b207d-80f6-4c4f-8b62-84292d9fff6f.png)   


* 위의 식을 만족하는 triplet을 만들면서 학습을 진행할 때, 완전 다른 사진일 때는 너무 쉽게 만족하는 경우가 많을 것이다.
        이런 경우, 학습이 제대로 되지 않는 문제가 발생한다.
* 따라서 잘 구분하지 못하는 사진을 넣어, 위의 식을 만족하지 않는 triplet을 만들어야 한다.
* 따라서 최대한 먼 거리에 있는 Positive를 고르고, 최대한 가까운 거리에 있는 negative를 골라야 한다.   

![image](https://user-images.githubusercontent.com/87224039/126899090-1785c16d-3fd1-442f-a8fe-ca329f61e771.png)
이를 각각 hard positive, hard negative로 표현한다.   
하지만, 전체 데이터에서 각각 hard point들을 찾아야 한다고 할 때,   
계산량이 많아져 시간이 많이 필요하며, 비효율적이고, 오버피팅이 생길 수 있다는 문제가 발생한다.   
따라서, 이것을 해결하기 위해 이 논문에서 mini batch 안에서 hard point를 찾도록 하는 방법을 제시한다.   
이 때, hard positive를 뽑는 것보다 모든 anchor-positive쌍을 학습에 사용하며, hard negative를 뽑을 때는 다음과 같은 식을 만족하는 x중에 뽑는 것이 좋은 성능을 보였다고 한다.   

![image](https://user-images.githubusercontent.com/87224039/126899152-fa1907e2-d557-4a7d-9f4d-bab846080282.png)   

> 이러한 negative examplars를 semi-hard라고 부른다.   
이는 anchor-positive보다 anchor-nagative간 거리가 더 멀긴 가지만   
margin이 충분히 크지 않은 nagative를 뽑는 것이다.


# 몰랐던 헷갈리던 기술용어
## 1. bottle-neck layer
CNN 에서 연산의 효율성을 높이기 위해 분석 대상의 크기를 축소하는 것을 pooling 이라고 한다.   
이러한 pooling 작업은 feature 의 특징을 추출한 데이터의 사이즈를 줄여 연산량을 줄이고 효율성을 높이기 위한 작업이다.   
그러나 분석의 대상이 3차원 데이터라면 해당 feature는 Channel 값을 갖게 된다.   
Channel 값이 많아지는 경우 연산에 걸리는 속도도 그만큼 증가할 수 밖에 없는데, 이때 Channel 의 차원을 축소하는 개념이 Bottleneck layer 이다.   

## 2. [pooling](https://hobinjeong.medium.com/cnn%EC%97%90%EC%84%9C-pooling%EC%9D%B4%EB%9E%80-c4e01aa83c83)   
Convolution을 거쳐서 나온 activation map이 있을 때,   
이를 이루는 convolution layer를 resizing하여 새로운 layer를 얻는것.   

![image](https://user-images.githubusercontent.com/87224039/126981001-4d88589c-9cc7-4609-a973-ccf6df8befb8.png)   

* max pooling = 최댓값을 뽑아낸다.   
![image](https://user-images.githubusercontent.com/87224039/126981192-caeca8a5-d77c-46f6-91d7-745ac0fc6594.png)   

* mean pooling = 평균값을 뽑아낸다.

## 3. LMNN



