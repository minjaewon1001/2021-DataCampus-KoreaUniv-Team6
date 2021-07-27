# GoogLeNet(Going deeper with convolutions)   
   
## 0. 배경   

LeNet-5를 시작으로 CNN은 이미지 분류에서 일반적인 구조가 되었음.   
CNN 구조에 dropout, pooling, ReLu, GPU 기법이 적용된 AlexNet이 ILSVRC 2012년 대회에서 우승을 차지하고,   
CNN을 세상에 알리게 됨.(이전까진 머신러닝 기법이 대회를 우승하였음)   
2년 뒤, Inception Block을 적용한 CNN모델인 GoogLeNet이 AlexNet의 파라미터 보다 12배 적은 파라미터로   
즉, AlexNet보다 가볍지만 정확도가 뛰어난 모델인 GoogLeNet이 ILSVRC 2014년 대회에서 우승(SOTA)을 차지함.   
   
![image](https://user-images.githubusercontent.com/87224039/127147955-e66d7243-706a-4ac6-a2d1-d48d480c5c55.png)   
   
ILSVRC 2014에서 VGGNet을 제치고 1등을 차지한 GoogLeNet.   
1 x 1 convolution layer의 사용, depth를 늘려 모델의 성능을 개선시키는 등. VGGNet과 유사한 부분 꽤 있음.   
* 구조이름(Code Name) : Inception(인셉션)    
* GoogLeNet의 이름은 LeNet으로부터 유래하였으며, 이는 Inception 구조의 성체라고 함.

## 1. Abstract & 2. Introduction   
   GoogLeNet의 특징에 대해 간략한 설명으로 이루어짐.   
   이 모델의 주요 특징은 '연산을 하는데 소모되는 자원의 사용 효율이 개선'되었다는 것임.   
   즉, 정교한 설계 덕에 네트워크의 depth와 width를 늘려도 연산량이 증가하지 않고 유지된다는 뜻임.   
   이때, Google팀에서는 성능을 최적화하기 위해 Hebbian printciple과 multi-scale processing을 적용함.   
   이 구조를 GoogLeNet이라고 부른다고 한다.   
   GoogLeNet은 22개의 layer를 가지며, 코드네임은 'Inception'   
   ![image](https://user-images.githubusercontent.com/87224039/127163235-6f615f15-0bcb-472f-ba8c-70155296f8d7.png)   
   

   * 좋은 결과를 내는 것은, 'deep한 구조와 클래식한 컴퓨터비전의 시너지 덕분'   
   * Mobile 및 Embedded 환경에서는 특히 전력 및 메모리 사용량 관점에서 효율적인 알고리즘의 중요!   
      그러므로,   
      '엄격한 고정된 구조를 가지는 것 보단 유연한 구조'   
      '추론시간에 1.5 billion 이하의 연산만을 수행하도록 설계'   
      > 학술적 + 현실적 두마리 토끼   
   * Inception이란 이름은 'Network in Network(NIN)라는 논문에서 유래.   
      > 정확하게는 인셉션 영화 대사인 "we need to go deeper"에서 착안함.   
      >> 이때 "deep"은 두 가지 의미를 가짐.
      >>> 1. "Inception module"의 형태로 새로운 차원의 구조 도입
      >>> 2. 네트워크의 깊이가 증가하였다는 직접적인 의미.   
      
   * 또한, Inception model은 theoretical work 측면에서 Arora 논문을 통해 고안되었다고 할 수 있음.   
## 3. Related Work   
LeNet-5를 시작으로 CNN은 일반적인 표준 구조를 가지게 되는데,   
이는 Convolutional layer가 쌓이고 그 뒤에 1개 또는 그 이상의 FC layer가 따라오는 구조임.   
또한 ImageNet과 같이 대용량 데이터에서의 요즘 트렌트는 layer의 수와 사이즈를 늘리고,   
오버 피팅을 해결하기 위해 dropout을 적용하는 것이다.   
따라서 GoogLeNet도 이와 같은 구조를 띤다.   
다음으로 Network in Network 논문 내용이 나오게 되는데, 이는 GoogLeNet에 많은 영향을 끼친 논문.   
먼저 Network in Network는 신경망의 표현력을 높이기 위해 제안된 접근법.   
이 방법은 1 x 1 Convolutional layer가 추가되며, ReLU activation이 뒤따름.   
이때, 1 x 1 Convolutional layer는 두 가지 목적으로 사용됨.   
1. 병목현상을 제거하기 위한 '차원 축소'
2. '네트워크 크기 제한'

즉, GoogLeNet에서도 위 두 가지 목적을 위해 1 x 1 Convolutional layer를 사용한다는 것인데,   
그럼 Network in Network에서는 왜 1 x 1 Convolutional layer를 사용하였고,   
이는 어떻게 위 두 가지 장점을 가져오는 것일까?   
[자세한내용](https://phil-baek.tistory.com/entry/3-GoogLeNet-Going-deeper-with-convolutions-%EB%85%BC%EB%AC%B8-%EB%A6%AC%EB%B7%B0)

## 4. Motivation and High Level Considerations   
이제 GoogLeNet이 나오게 된 배경에 대해서 설명함.   
심층 신경망의 성능을 개선시킬 수 있는 가장 간단한 방법은 '신경망의 크기를 늘리는 것'임.   
이때, 크기를 늘린다는 것은 다음 두 가지 의미를 뜻함.   

1. 'depth의 증가(level의 수가 증가)
2. 'width의 증가(각 level의 유닛 수 증가)   

이는 좋은 성능의 모델을 얻을 수 있는 쉽고 안전한 방법이지만.....   
두 가지 문제점이 있음.   
첫 번째,
> 크기가 커진다 = 파라미터의 수가 늘어난다 = 오버피팅이 일어나기 쉽다.   
> ![image](https://user-images.githubusercontent.com/87224039/127166256-d90bd1da-599c-4633-9d25-b9efbd46778f.png)   
> 이는 주요한 병목현상이 될 수도 있는데, ImageNet처럼 세밀한 카테고리를 구별해야 하는경우,   
> 고품질의 트레이닝 셋을 생성하는 것은 매우 treaky하며, 비용이 높기 때문.   

두 번째,
> 네트워크가 커질수록 컴퓨터 자원의 사용량이 늘어난다는 것.   

이러한 상황에서는 컴퓨팅 자원은 한정적이므로, 네트워크의 크기를 늘리는 것 보다   
컴퓨팅 자원을 '효율적'으로 분배하는 것이 더욱 중요!   
![image](https://user-images.githubusercontent.com/87224039/127166598-5965eb9d-80ea-40ea-8cd1-96ee32cc9b24.png)   
위 두 문제를 해결하는 방법은, 'dense한 Fully-Connected 구조에서 Sparsely Connected 구조로 바꾸는 것'   
그림에서 보는 것 처럼 빽빽한 오른쪽 네트워크에서, 널널한 왼쪽 네트워크로 구조를 바꾸는 것.   
하지만, 오늘날의 컴퓨팅 환경은 균일하지 않은 Sparse data 구조를 다룰 때 매우 비효율적.   
![image](https://user-images.githubusercontent.com/87224039/127167593-b608b41f-7c5a-403c-b143-278f7f6c3ba3.png)   

이때, Sparse 매트릭스 연산을 다룬 많은 문헌에서는 Sparse 매트릭스를 클러스터링 하여   
상대적으로 Dense 한 Submatrix를 만드는 것을 제안하였고,   
이는 좋은 성능을 보였다고 함.   
## 5. Architectural Details   
이제 본격적으로 Inception 구조에 대해 자세히 설명한다.   
## 6. GoogLeNet
이제 Inception module이 적용된 전체 GoogLeNet의 구조에 대해서 알아본다.   
## 7. Training Methodology
여기서는 모델 훈련을 어떻게 하였는지에 대해 설명하고 있다.   
## 8. Conclusions
Inception 구조는 Sparse 구조를 Dense 구조로 근사화하여 성능을 개선하였다.   
이는 기존에 CNN 성능을 높이기 위한 방법과는 다른 새로운 방법이었으며,   
성능은 대폭 상승하지만 연산량은 약간만 증가한다는 장점이 있다.
