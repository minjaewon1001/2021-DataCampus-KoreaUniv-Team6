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
   
