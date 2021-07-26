* 논문 공부 & 요약   


# FaceNet : 얼굴인식 및 클러스터링을 위한 통합된 임베딩(내장)    

## 1. Abstract & Introduction  (개요 & 소개)
최근 얼굴 인식 분야에서 상당한 발전에도 불구하고, 규모에 맞게 얼굴 검증과 인식을 효율적으로 구현하는 것은 현재 접근법에 심각한 문제를 제기하고 있다.

* 기존의 deep networks 기반의 얼굴인식 :
  - CNN의 [bottle-neck layer](##1.-bottle-neck-layer)(중간병목층)을 취하는데, 이게 '간접적', '비효율성'이라는 단점을 내포함.
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
         5) https://datascience.stackexchange.com/questions/15214/what-are-interleaved-layers-of-convolutions

  - non-linear activations(비선형 활성화)
    * https://subinium.github.io/introduction-to-activation/

  - local response normalizations(로컬 응답 정규화)
    * https://neurowhai.tistory.com/134

  - max pooling layers(최대 layer들 모으기)
    * https://hobinjeong.medium.com/cnn%EC%97%90%EC%84%9C-pooling%EC%9D%B4%EB%9E%80-c4e01aa83c83


* 두 번째 architecture, Szegdy 등의 Inception 모델
최근 ImageNet 2014의 성공적 접근법으로 사용되었던 Szegdy 등의 Inception 모델을 기반으로 합니다[16].
>> 이 부분 너무 광범위해서.. section2. 관련 문헌 part는 따로 빼서 기술하려함. 조금만 참아주세용 :)   


이러한 networks는 여러 개의 서로 다른 convolution과 pooling layers를 병렬로 실행하고 응답하는 concatenate(연결하는) 혼합 layers를 사용합니다.
이러한 모델은 파라미터 수를 최대 20배까지 줄일 수 있으며, 유사한 성능에 필요한 FLOPS 수를 줄일 수 있다는 것을 발견했습니다.
-	FLOPS란?
컴퓨터의 성능을 수치로 나타낼 때 주로 사용되는 단위.
https://ko.wikipedia.org/wiki/%ED%94%8C%EB%A1%AD%EC%8A%A4
그건 face verification(검증)과 recognition(인식)작업의 방대한 Corpus(코퍼스, 언어 데이터를 한데 모아둔 것)이다.
Review하는 것은 본 논문의 범위를 벗어나므로 가장 관련성이 높은 최근 작업에 대해서만 간략히 논의하겠습니다.
그 [15,17,23]의 모든 작업은 복잡한 시스템을 사용합니다. 차원 감소를 위한 PCA 및 classification(분류)를 위한 SVM과 deep convolutional network의 output(출력)을 결합한 다단계 네트워크입니다.

Zhenyao et al.(젠야오 외~.)[23] deepnetwork를 사용하여 얼굴을 표준 정면 view로 “왜곡”한 다음, 각 얼굴을 알려진 identity에 속하는 것으로 분류하는 CNN을 학습합니다.

얼굴 확인을 위해 SVM ensemble(앙상블)과 함께 네트워크 출력의 PCA가 사용됩니다.

Taigman et al.(다이그먼 외~.)[17]은 얼굴을 일반 3D 형상 model에 정렬하는 다단계 접근방식을 제안합니다.
멀티-클래스 네트워크는 4000개 이상의 identities에서 얼굴 인식 작업을 수행하도록 교육됩니다.
저자들은 또한 두 얼굴 features사이의 L1 거리를 직접 최적화 하는 이른바 ‘Siamese network(샴 네트워크)”를 실험했습니다.
LFW에서 가장 우수한 성능(97.35%)은 서로 다른 정렬과 색상 채널을 사용하는 3개 네트워크의 앙상블에서 비롯됐습니다.
이러한 네트워크의 예측거리는 비선형 SVM을 사용하여 결합됩니다.( 2커널에 기반한 비선형 SVM 예측)

Sun et al.[14, 15]는 compact(작음)하므로 상대적으로 계산 네트워크 비용이 저렴하다고 제안합니다.
그들은 25개의 네트워크 앙상블을 사용하며, 각 네트워크마다 다른 face patch(부분)로 작동합니다. LFW에 대한 최종 성능(99.47%[15])을 위해 저자들은 50개의 reponses(정규반응과 플립반응, regular and flipped)을 결합합니다.

Both PCA and a Joint Bayesian model [2] that effectively correspond to a linear transform in the embedding space are employed.

Their method does not require explicit 2D/3D alignment.

The networks are trained by using a combination of classification and verification loss.

The verification loss is similar to the triplet loss we employ [12, 19], in that it minimizes the L2-distance between faces of the same identity and enforces a margin between the distance of faces of different identities.


The main difference is that only pairs of
images are compared, whereas the triplet loss encourages a relative distance constraint.

A similar loss to the one used here was explored in
Wang et al. [18] for ranking images by semantic and visual similarity.


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

***






