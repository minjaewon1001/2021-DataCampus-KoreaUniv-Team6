## **논문**

\* [https://arxiv.org/abs/1905.02244](https://arxiv.org/abs/1905.02244)

## **개요**

우리는 새로운 아키텍처 디자인 뿐만 아니라 상호 보완적인 검색 기술들의 결합을 기반으로 한 MobileNets의 다음세대를 제시함.

-   MobieNetV3는 NetAdapt 알고리즘으로 보완된 하드웨어-인식(Hardware-aware) 네트워크 아키텍처 탐색 (Network Architecture Search, NAS)의 결합을 통해 모바일 폰의 CPUs에 맞춰 튜닝되며, 그런 다음 새로운 아키텍처의 개발을 통해 상당히 개선됬음.
-   이 논문은 자동화된 탐색 알고리즘과 네트워크 설계가 기술의 전반적인 상태를 개선시키는 보완적 방법을 활용하여 어떻게 상호작용 하는지에 대한 탐색을 시작함.
-   이 과정을 통해, 우리는 배포를 위한 두 가지 새로운 MobieNet 모델을 만듬 :  
    1\. MobileNetV3-Large  
    2\. MobileNetV3-Small  
       >>이는 높고 낮은 [리소스](https://ko.wikipedia.org/wiki/%EB%A6%AC%EC%86%8C%EC%8A%A4) 사용 사례들을 대상으로 함.
-   그런 다음 이러한 모델들은 개조되고, Object Detection과 [Semantic Segmentation](https://zorang2.tistory.com/30)의 작업들에 적용됨.
-   [Semantic Segmentation](https://zorang2.tistory.com/30) (또는 어떤 Dense 픽셀 예측) 작업의 경우, 우리는 Lite Reduced Atrous Spatial Pyramid Pooling (LR-ASPP) 라는 새롭고 효율적인 Segmentation Decoder를 제시함.
-   우리는 모바일 분류 (Classification), 감지 (Detector), 분할 (Segmentation) 에 대해 새로운 최첨단 결과들을 달성함.
-   MobileNetV2와 비교했을 때, MobileNetV3-Large가 ImageNet Classification에서 3.2% 정확한 반면에, 지연 시간을 20% 감소시킴.
-   MobileNetV3-Small은 V2와 대기시간은 비슷하며, 6.6% 더 정확함.
-   MobileNetV3-Large Detection은 COCO Detection에서 MobileNetV2와 거의 동일한 정확도에서 25% 이상 더 빠름.
-   MobileNetV3-Large LR-ASPP는 Cityscapes Segmentation에 경우에 유사한 정확도에서 MobileNetV2 R-ASPP보다 34% 더 빠름.

## **1\. 소개**

**효율적인 신경망들은 완전히 새로운 기기 경험을 가능하게 하는 모바일 어플리케이션에서 유비쿼터스화 되어 가고 있음.**

-   또한, 모바일 어플리케이션은 개인 프라이버시를 가능하게 하는 핵심요소로써, 사용자가 자신들의 데이터를 평가받기 위해 서버에 데이터를 전송할 필요 없이 신경망의 이점을 얻을 수 있음.
-   신경망 효율성의 발전들은 높은 정확도와 낮은 지연시간을 통해 사용자 경험을 향상시킬 뿐만 아니라, 감소된 전력소비를 통해 배터리 수명을 유지하도록 도움을 줌.

**이 논문 에서는, 기기 내 컴퓨터 비전에 전력을 공급하는 높은 정확도와 효율성을 가진 차세대 신경망 모델을 제공하기 위한 MobileNetV3 Large 및 Small 모델을 개발하기 위해 우리가 취했던 접근법을 설명함.**

-   이 새로운 네트워크들은 최첨단 기술을 발전시키고, 효과적인 모델을 구축하는 새로운 아키텍처 개발과 자동화된 탐색을 조합하는 방법 (How to Blend) 을 보여줌.

**이 논문의 목표는 모바일 기기에서 accuracy-latency (정확도-지연시간) 의 trade-off (균형) 를 최적화하는 최상의 모바일 컴퓨터 비전 아키텍처를 개발하는 것임.**

-   이러한 점을 달성하기 위해서, 우리는 다음과 같은 점들을 도입, 소개함.  
    1\. 상호보완 탐색 기술들 (Complementatry Search Techniques).  
    2\. 모바일 환경에 실용적인 새롭고 효율적인 비선형 함수  
    3\. 새롭고 효율적인 네트워크 디자인(설계)  
    4\. 새롭고 효율적인 segmentic decoder (분할 해독기)

## **2\. 관련 문헌**

## **3\. Efficient Mobile Building Blocks**


-------------------------------------------------------   

**요약.**   

MobileNetV3는 가장 효과적인 모델을 구축하기 위해 layer의 결합을 block으로 사용함.

layer는 또한 **swish 비선형 함수**를 사용함.

또한, SENet에서 소개되었던 **SE Block**을 사용함.

SE Block에서 사용하는 sigmoid는 **hard sigmoid**로 대체하여 사용하고,

swish 비선형 함수는 더 효과적인 **hard swish**를 사용함.

-------------------------------------------------------   

모바일 모델들은 점점 더 효율적인 빌딩 블록들에 구축되어져 왔음.


-   **MobileNetV1**은 기존 Convolutional Layers에 대한 효율적인 대체제로써 **Depth-wise Separable Convolutions ( 분리가능한 깊이 기준 컨볼루전)** 를 도입했음.
-   Depth-wise Separable Convolutions는 Feature 생성 매커니즘에서 공간 필터링을 분리하여 기존 Convolution을 효과적으로 분해함(Factorize).
-   Depth-wise Separable Convolutions는 두 개의 분리된 계층들에 의해 정의됨:  
    \* 공간 필터링에 대한 가벼운 무게 심층 컨볼루션 (Light weight Depthwise Convolutions).  
    \* Feature 생성에 대한 더 무거운 1 x 1 Pointwise Convolutions.

-   MobileNetV2는 문제의 낮은 순위 특성 (Nature) 을 활용 (Leveraing) 하여 훨씬 더 효율적인 계층 구조를 만들기 위해 선형 Bottleneck 과 Inverted Residual 구조를 도입했음.
-   이 구조는 Figure 3에서 나타나며, x 1 확장 Convolution에 이어 Depth-wise Convolutions와 1 x 1 Projection 계층에 의해 정의됨.
-   입력과 출력은 이들이 채널 수가 동일 한 경우에만 잔차 연결로 연결됨.
-   이 구조는 입력과 출력에서 Compact한 표현을 유지하면서 내부적으로는 고차원 Feature 공간으로 확장하여 비선형 채널 변형의 표현력을 증가시킴.



![image](https://user-images.githubusercontent.com/87224039/128962939-a77621dd-03a9-4978-9172-fc9c99163cdd.png)   



MnasNet은 Bottleneck에 Squeeze와 Excitation에 기초한 경량 주의 모듈들을 도입하여 MobileNetV2 구조에 설계됨.

Squeeze와 Excitation 모듈이 기존 ResNet과 다른 위치에서 통합된다는 것을 주목해야함.

이 모듈은 Figure 4와 같이 가장 큰 표현에 주의를 기울이기 위해 확장시 Depthwise 필터들 이후에 배치됨.

![image](https://user-images.githubusercontent.com/87224039/128962967-6ec7c983-5359-46ea-b0fd-216014be595e.png)   
MobileNetV3는 가장 효과적인 모델을 구축하기 위해 layer의 결합을 block으로 사용함.

layer는 또한**swish 비선형 함수**를 사용함.

또한, SENet에서 소개되었던**SE Block**을 사용함.

SE Block에서 사용하는 sigmoid는**hard sigmoid**로 대체하여 사용하고,

swish 비선형 함수는 더 효과적인**hard swish**를 사용함.   

-------------------------------------------------------   
### 참고자료
[https://soobarkbar.tistory.com/62](https://soobarkbar.tistory.com/62)   
>> 거의 직역   


[https://deep-learning-study.tistory.com/551](https://deep-learning-study.tistory.com/551)   
>> 이해하기 쉬움 이거먼저읽고 위에거 읽는거 추천   


[https://seing.tistory.com/165](https://seing.tistory.com/165)   
>> MnasNet

