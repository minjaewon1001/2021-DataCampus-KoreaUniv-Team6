         * 나의 재밌는 부분

![image](https://user-images.githubusercontent.com/87224039/126892522-a3d38c33-2661-4e58-93c8-84263df59015.png)

         * Figure 1.
         포즈와 조명은 오랫동안 얼굴 인식에 문제가 되어 왔다.
         이 그림은 서로 다른 포즈와 조명 조합으로 동일한 사람과 다른 사람의 얼굴 쌍 사이의 FaceNet 거리를 출력한 것을 보여준다.
         0.0의 거리는 동일한 얼굴을 의미하고, 4.0은 반대 스펙트럼에 해당하며, 두개의 다른 연관성이 있음을 의미한다.
         모든 쌍이 정확하게 1.1의 임계값으로 분류되는 것을 볼 수 있다.
         
         신기하다.. 사이다 마신 것 같다.





* 논문 공부 & 요약


# FaceNet : 얼굴인식 및 클러스터링을 위한 통합된 임베딩(내장) 

## 1. Abstract & Introduction  (개요 & 소개)
최근 얼굴 인식 분야에서 상당한 발전에도 불구하고, 규모에 맞게 얼굴 검증과 인식을 효율적으로 구현하는 것은 현재 접근법에 심각한 문제를 제기하고 있다.

* 기존의 deep networks 기반의 얼굴인식 :
  - CNN의 bottle-neck layer(중간병목층)을 취하는데, 이게 '간접적', '비효율성'이라는 단점을 내포함.
  - 2D, 3D로 aligned(정렬된)된 얼굴 이미지를 필요로 함.


* FaceNet :
  - 기존 방식과 대조적으로, LMNN에 기초한 triplet based loss function (3중 손실 함수)를 사용하여 128차원으로 임베딩하여 학습시킴.
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

## 3. Method()
### 3.1. Triplet Loss (삼중손실)




