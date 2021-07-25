# Abstract
Facenet은 얼굴 이미지로부터 직접적으로 유클리드 공간에 따른 얼굴 유사도를 학습한다. Bottleneck layer를 사용하지 않고 DCN을 차용해 사용했다.

# 1. Introduction

Face-Verification(동일인물인지), Recognition(누구인지), Clustering(공통되는 사람들 찾기) 세가지의 통합 시스템을 소개할 것입니다.
이 방법은 이미지마다 Deep Conv Net을 사용하여 유클리드 임베딩을 학습하는 것입니다.
임베딩 공간의 squared L2 Distances(유클리드 거리의 제곱)는 얼굴 유사도와 곧바로 일치합니다. 즉 같은 사람의 얼굴은 적은 거리를 가지고 다른 사람일 경우 큰 거리를 가지게 됩니다.

한 번 이 임베딩이 만들어지고 나면 앞서말한 문제들은 쉽게 해결할 수 있습니다. Face-Verification은 두 임베딩 사이의 거리가 일정 차이를 넘는지로, Recognition은 k-NN Classfication문제로, Clustering은 k-means나 집적(agglomerative) clustering 같은 것으로 바로 해결가능합니다.

이전의 deep net 기반 얼굴인식 접근은 known face identities의 집합으로 학습된 classification layer를 사용하였고 학습에 사용되었던 identities들의 집합을 넘어 얼굴인식을 일반화하기 위한 방법으로 중간 병목층을 사용했습니다.이 접근의 단점은 이 방법의 간접적임과 비효율성입니다. 최근에는 PCA(고차원의 데이터를 저차원으로 환원해주는 통계학적 기법)를 이용하여 이런 차원문제를 줄였습니다.

# 2. Related Work
deep net을 이용한 최근의 작업과 비슷하게 우리의 접근 방식은 순수하게 image의 픽셀로부터 얻어진 표현을 학습하는 data driven method입니다. 우리는 engineered된 특성을 사용하기보다는 여러 포즈, 조명, 다양한 조건을 얻기 위해 large dataset of labelled faces를 사용합니다. 

이 논문에서는 최근에 컴퓨터 비전 커뮤니티에서 큰 성과를 거둔 두개의 다른 deep net구조를 살펴볼 것이며, 두개다 cnn을 사용했습니다.

첫번째 모델은 Zeiler&Fergus Model에 기반을 둔 multiple inter- leaved layers of convolutions, non-linear activations, local response normalizations, and max pooling layers로 이루어져 있다. 우리는 여기에 **1x1xd의 conv layer를 추가하였다.**

두번째 모델은 Inception model of Szegedy에 기반을 두었으며 최근에 ImageNet에 대해 성공적인 접근을 이루었다.
이 두 네트워크는 여러개의 다른 conv layer와 pooling layer를 병렬적으로 실행하는 **mixed layers를 사용**하며 그들의 결과를 이어붙입니다.

# 3. Method
FaceNet은 cnn을 사용하며 두개의 다른 핵심 구조를 논의했습니다. Zeiler&Fergus스타일의 network와 Inception model of Szegedy이 있습니다.우리의 접근에서 가장 중요한 부분은 전체 시스템의 end-to-end learning에 있습니다. FaceNet에서는 얼굴인식, 검증, 클러스터링에서 이루고자 하는 바를 직접적으로 반영하는 triplet loss를 사용할 것입니다. 즉, feature space속의 이미지 x로부터 embedding f(x)를 얻어서 같은 사람이면 sqaured distance가 작게, 다른 사람이면 크게 할 것입니다. 비록 다른 loss와 직접적인 비교는 하지 않았지만 triplet loss가 얼굴검증에 더 적합하다고 보입니다. 
triplet loss는 한 사람과 다른 모든 얼굴로부터 나온 모든 얼굴쌍에 대해 margin의 값을 강화해 차이점을 극대화 합니다.

##### Triplet Loss
엠베딩은 f(x) ∈ R^d로 나타내어지며 이것은 이미지 x를 d차원의 유클리드 공간에 임베딩시킵니다. 이 임베딩의 결과가 거리가 1인 d차원 hypersphere에 존재하도록 합니다. 우리는 특정 사람의 앵커이미지가 다른 모든 positive이미지가 negative이미지보다 가깝다는 것을 보장하려고 합니다.
![image](https://user-images.githubusercontent.com/77095328/126892494-ddb0fe22-8c18-4e4c-81ff-b53358f49153.png)
**(positive한 경우에 더 적은 값을 가지도록 학습시킴)**

**따라서 이를 위해 아래와 같은 식이 성립하길 원하고 이때 알파는 학습을 강화시키기 위한 margin을 의미한다.** (1)
![image](https://user-images.githubusercontent.com/77095328/126892562-87f53e9e-7550-43b4-937e-912304de5c1d.png)

**따라서 최소화시켜야하는 로스(변환 과정 속 손실되는 값), 즉 cost function은 다음과 같다.**
![image](https://user-images.githubusercontent.com/77095328/126892584-e79b0d68-1f8d-414e-9e2c-ab8717496e62.png)

하지만, 데이터셋에서 골라진 대부분의 3개로 이루어진 쌍들은 **(1)** 을 만족할 것이기에 이를 만족하지 않는 쌍인 hard triplet을 선택하기 위해 새로운 방식으로 접근한다. 

##### Triplet Selection
**(1)** 의 식을 만족하지 않는 데이터 쌍을 구하기 위해서는, d(A, P)(argmax)와 d(A, N)(argmin)의 값이 비슷한 것을 찾아야 하는데, 모든 데이터 쌍에 대해 이를 구할 수는 없기 때문에 다음과 같은 2가지 방법을 제시합니다. 

    1. recent network checkpoint를 이용하고 데이터의 일부로 argmin과 argmax를 계산해서 매 스텝마다 triplet을 offline으로 생성하는 것이다.

    2. triplet을 online으로 생산하는 것이다.   
       mini-batch에서 hard positive/negative예시를 고르는 것으로 이루어질 수 있다.

이 논문에서는 2번 방식을 채택했습니다.
1번 방식은 Anchor와 positive exemplar사이의 거리보다 더 멀지만 거리가 여전히 ahchor-positive distance와 가깝기 때문에 여전히 hard하다는 이유를 바탕으로 **semi hard** 라는 방식으로 불립니다. 

###### 그래서 어떻게?
먼저 small mini-batch를 사용할 것이고 이것은 SGD(Stochastic Gradient Descent)를 통한 수렴 속도를 향상시킬 것이다. 또한 실행 details는 10에서 수백개의 exemplars들로 이루어진 batch를 더 효율적으로 만들 것입니다.batch size에 대한 main constraint는 우리가 mini-batch로부터 hard relevant triplets를 고르는 방법입니다. 그리고, 대부분의 실험에서 약 1800exemplar정도의 batch size를 사용했었습니다.

##### Deep Convoultional Network
SGD를 활용해 CNN을 학습시켰고, learning rate는 0.5, 훈련 시간은 1000~2000 시간, loss는 500시간 이후부터 감소, margin α는 0.2. 

데이터센터에서 실행되는 모델은 많은 파라미터를 가질 수 있고 매우 좋은 컴퓨터 성능을 필요로 한다. 하지만, 반면에 핸드폰에서 돌아가는 모델은 적은 파라미터를 가져야하고 폰 메모리에도 맞아야 한다. 
(모든 모델은 non-linear activation함수 때문에 조정된 linear unit을 사용하였습니다.)

![image](https://user-images.githubusercontent.com/77095328/126892935-a199532a-f080-4bc3-b759-925da3da407e.png)


    1.위의 표에서 나타나듯 1x1xd conv layer를 원래의 Zeiler&Fergus 구조의 conv layer사이에 추가하였습니다.
    총 1억 4천만개의 파라미터를 가지며 이미지마다 약 16억의 FLOPS가 필요합니다.

    2. 두번째 카테고리는 GoogLeNet style Inception models에 기반을 뒀다. 
      이 모델은 20X(6.6~7.5M)정도의 파라미터를 가지며 5X(500M~1.6B)정도의 더 적은 FLOPS까지만 필요합니다.        
      이 모델의 일부가 깊이나 필터 면의 개수 면에서 매우 크게 줄었기 때문에 폰에서도 실행 가능합니다.
    
*NNS1 : 26M파라미터, 이미지마다 220M FLOPS 필요
  *NNS2 : 4.3M파라미터, 20M FLOPS 필요
    *NN2 : 가장 큰 모델 7.5M파라미터, 1.6B FLOPS
      *NN3 : 동일구조, input size 160x160으로 감소
        *NN4 : input size 96x96, 285M FLOPS

# 4.Datasets and Evaluation
동일인물에 대한 모든 얼굴쌍은 P(same)으로 나타내어지고 모든 다른사람들에 대한 쌍은 P(diff)로 나타내어집니다.
##### 같은 사람이라고 맞게 분류된 집합을 다음과 같이 정합니다.

  ![image](https://user-images.githubusercontent.com/77095328/126890473-3d959168-d785-412f-a788-80c37fb40b15.png)

##### 비슷하게 같은 사람이라고 분류되었지만 잘못 분류된 집합은 다음과 같이 정합니다.

  ![image](https://user-images.githubusercontent.com/77095328/126890500-17372c78-90d3-482f-b948-d51b44090d78.png)

##### 주어진 거리 d에 대해서 validation rate와 false accept rate는 다음과 같습니다.

  ![image](https://user-images.githubusercontent.com/77095328/126890507-c3b9e0b1-5476-4aff-bad0-13753137552e.png)


# 5. Experiments
8M명의 서로 다른 사람으로 이루어진 100M에서 200M의 training face thumbnails이 사용됐다.
face detector 는 각각의 이미지마다 실행되고 각 얼굴에 딱 맞는 바운딩 박스가 생성됐다. 
이 face thumbnails들은 각 네트워크의 input size로 resizing 됐다. input size는 96x96~224x224pixels으로 설정했다.

##### Effect of CNN Model


  4가지 모델의 성능에 대해서 설명한다. 
  종합적으로, 각 구조의 top model의 최종 성능은 비슷했다. 
  하지만 NN3같은 몇몇의 Inception기반 모델은 모델 크기와 필요 FLOPS를 줄였음에도 여전히 좋은 성능을 나타냈다.
  

 ![image](https://user-images.githubusercontent.com/77095328/126890755-7cc415f2-0a1b-47c8-871c-ca6313b6ebfc.png)

   가장 인풋 이미지가 큰 모델(NN2)이 가장 작은 인풋을 가진 NNS2와 비교해서 급격한 정확도 향상을 보여주지만, 후자(NNS2)는 30ms동안 또는 모바일 폰에서의 이미지에서도 face clustering을 하는 데에 충분한 정확도를 가지도록 실행 가능합니다. ROC for FAR < 10^(-4)에서의 sharp dropdms 테스트 데이터 속의 잘못된 라벨링을 의미합니다. 매우 낮은 false accept rate에서, 하나의 잘못 라벨링된 이미지는 정확도 곡선에 매우 큰 영향을 끼치는 것을 알 수 있습니다.
  
##### Embedding Dimensionality
많은 임베딩 차원 분석을 통해 최종적으로 결정된 임베딩 차원은 128차원이다. 


![image](https://user-images.githubusercontent.com/77095328/126891629-e5f05f0c-9d21-4e21-ba6b-b171ef00909f.png)

임베딩 차원이 클수록 작은거보다는 성능이 좋을 것이라고 생각할 수 있지만, 정확도의 최고점은 그럴지도 몰라도, 같은 정확도를 얻기 위해서 더 많은 훈련이 필요한 경우도 존재한다.
128차원의 float벡터를 사용하여 훈련하는 것은 128bytes로 정확도의 손실없이 양자화 될 수 있다는 것입니다. 그러므로 각각의 얼굴은 큰 규모의 clustering과 인식에 이상적인 컴팩트한 128차원 벡터로 표현되어질 수 있습니다. 작은 임베딩은 정확도의 손실이 존재하나 모바일 기기에서 사용되어질 수 있다는 장점이 있다.


# Summary

Facenet은 face verification을 위한 유클리드 공간에 직접적으로 임베딩하는 법을 학습하는 방법을 제시한다. 이는 CNN bottleneck layer를 사용하거나 추가적인 후처리를 해야하는 다른 방법들과는 다르다. 우리의 end-to-end training은 초기 설정을 간단하게 하고 성능을 향상시키는 수작업과 같은 손실을 최적화하는 것을 직접적으로 보여줍니다.

Facenet의 다른 장점은 최소한의 조절(얼굴 주변 영역을 정확히 자르는 것)만이 필요하다는 것입니다. 복잡한 3D alignment를 실행하는 것을 예로 들 때, similarity transform alignment를 실험했으며 이것이 성능을 약간 향상시킬 수 있음을 확인했습니다. 





# 논문 해석 중 이해가 안 가는 부분.    혹은 학습이 필요한 기술 목록
1. LFW dataset 활용법
2. CNN (Conv Neural Net)
3. DCN (Deep Conv Net)
4. Deep Net
5. k-NN Classification
6. k-means
7. PCA
8. LMNN(Large margin nearest neighbor)
9. triplet loss
10. Zeiler&Fergus Model
11. Triplet Selection
12. SGD
###### What is SGD(Stochastic Gradient Descent)
![image](https://user-images.githubusercontent.com/77095328/126892889-981640b7-2a06-4830-bd1c-de5cd3f5c7db.png)
