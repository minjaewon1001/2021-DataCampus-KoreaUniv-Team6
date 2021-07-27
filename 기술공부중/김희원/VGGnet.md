> VGG16 – Convolutional Network for Classification and Detection
>
> 2018.11.20

> 네트워크의 깊이 변화에 따른 top-5 error의 변화 & 요약
> 
> 2012년, 2013년 우승 모델들은 8개의 층으로 구성되었었다. 
> 
> 반면 2014년의 VGGNet(VGG19)는 19층으로 구성되었고, 또한 GoogLeNet은 22층으로 구성되었다. 
> 
> 그리고 2015년에 이르러서는 152개의 층으로 구성된 ResNet이 제안되었다. 
>
> ![image](https://user-images.githubusercontent.com/87646049/127174395-5b2b0645-85e8-4f6b-88b5-7518744a27c2.png)
>
> 네크워크가 깊어질 수록 성능이 좋아졌음을 확인할 수 있다. 
> 
> VGGNet은 사용하기 쉬운 구조와 좋은 성능 덕분에 그 대회에서 우승을 거둔 조금 더 복잡한 형태의 GoogLeNet보다 더 인기를 얻었다. 


![image](https://user-images.githubusercontent.com/87646049/127168598-649d5dda-6655-4b32-858d-32b0e843f470.png)

-  Oxford 대학의 K. Simonyan과 A. Zisserman이 "Very Deep Convolutional Networks for Large-Scale Image Recognition" 2015 ICLR에 게재된 논문에서 제안한 신경망 모델임
-  2014년 이미지넷 이미지 인식 대회에서 준우승을 함
-  ImageNet에서 92.7%의 상위 5개 테스트 정확도 (1000개 클래스에 속하는 1400만 개 이상의 이미지 데이터 세트)
-  큰 커널 크기 필터(첫 번째 및 두 번째 컨볼루션 계층에서 각각 11 및 5)를 여러 3x3 커널 크기 필터로 차례로 교체하여 AlexNet보다 개선되었음
-  (VGG16은 몇 주 동안 훈련되었으며 NVIDIA Titan Black GPU를 사용함)


## VGGNET 구조

-  VGGNet의 original 논문의 개요에서 밝히고 있듯이 이 연구의 핵심은 네트워크의 깊이를 깊게 만드는 것이 성능에 어떤 영향을 미치는지를 확인하고자 한 것임
-  VGG 연구팀은 깊이의 영향만을 최대한 확인하고자 컨볼루션 필터커널의 사이즈는 가장 작은 3 x 3으로 고정
-  16개 또는 19개의 층으로 구성된 모델을 의미함 ( VGG16, VGG19로 불림. VGG-F, VGG-M, VGG-S와 차이가 있음 )
-  AlexNet과 같이 병렬적 구조로 이뤄짐 ( VGG-F, VGG-M, VGG-S 모델은 8개의 층을 가진 AlexNet과 유사하지만, 병렬적 구조로 이뤄지지 않음 )

그것은 바로 3 x 3 필터로 두 차례 컨볼루션을 하는 것과 5 x 5 필터로 한 번 컨볼루션을 하는 것이 결과적으로 동일한 사이즈의 특성맵을 산출함
3 x 3 필터로 세 차례 컨볼루션 하는 것은 7 x 7 필터로 한 번 컨볼루션 하는 것과 대응된다.

![image](https://user-images.githubusercontent.com/87646049/127175265-10a092b9-a131-4a03-8832-ee676221acb5.png)

 
 
* 가중치 또는 파라미터의 갯수의 차이다. 3 x 3 필터가 3개면 총 27개의 가중치를 갖는다. 반면 7 x 7 필터는 49개의 가중치를 갖는다. 
* CNN에서 가중치는 모두 훈련이 필요한 것들이므로, 가중치가 적다는 것은 그만큼 훈련시켜야할 것의 갯수가 작아진다. 따라서 학습의 속도가 빨라짐
* 동시에 층의 갯수가 늘어나면서 특성에 비선형성을 더 증가시키기 때문에 특성이 점점 더 유용해진다. 

![image](https://user-images.githubusercontent.com/87646049/127169064-c6f54fb6-c523-4b7f-896d-abd3fa352f04.png)

![image](https://user-images.githubusercontent.com/87646049/127169197-6fe4f630-1b5e-42d4-beaf-61f113ab0d54.png)


- cov1 레이어에 대한 입력은 고정 크기 224 x 224 RGB 이미지
- 구성 중 하나에서 입력 채널의 선형 변환(비선형성 뒤따름)으로 볼 수 있는 1x1 컨볼루션 필터도 사용함
- conv의 공간 패딩 레이어 입력은 컨볼루션 후에 공간 해상도가 유지되도록 하는 것
- 패딩은 3x3 conv에 대해 1픽셀
- 공간 풀링은 conv의 일부를 따르는 5개의 최대 풀링 레이어에 의해 수행됨
- Max-pooling은 2×2 픽셀 윈도우에서 수행됨


## 단점
- 훈련이 매우 느림 (파라미터 수가 너무 많아서)
- 네트워크 아키텍쳐 가중치 자체가 상당히 큼 (디스크/대역폭 관련 문제)



 
