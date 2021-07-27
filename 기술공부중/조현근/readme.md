# ILSVRC   
* ILSVRC(ImageNet Large Scale Visual Recognition Challenge) :   
  ImageNet이라는 대용량 데이터셋을 활용하여 가장 높은 이미지 분류 성능을 내는 경진대회   
  
* 현재 2017까지 진행되었으며, 현재 이미지넷은 3D 이미지 데이터 셋을 준비하고있다고함.   

* 즉, 앞으로 CNN 모델은 #D 데이터를 분석하는 영역까지 나아갈 것이며, 3D GAN이나 3D 분석이 보다 보편적이 될 것으로 전망.   

* 대회도 그 쪽 방면으로 될 것 같으니, 잘 학습된 모델이 나오면 그걸 사용해보는 것을 추천.   

# CNN모델의 발전방향 요약   

![image](https://user-images.githubusercontent.com/87224039/127144600-c51b7050-9c9a-477b-b8b2-b9084aa3478b.png)   

초기 Convolution 연산이라는 방식으로 SVM을 이긴 딥러닝 CNN구조에서 시작.   

앞으로는 계속 이 레이어를 더 깊게 늘리고 필터를 더 많이 사용하는 방식으로 정밀도를 높였음.   

그러다가 레이어가 너무 많아지고 학습시 기울기 소실이 일어나는 지경이 되자   

ResNet에서는 구조를 늘리는 것뿐 아니라, 구조의 효율성을 생각하며 Skip Connection이라는 구조를 생각해냄.   

이후 이를 통해 보다 더 레이어를 늘릴 수 있게 되어서 이후 모델들은 ResNet을 기반으로 레이어를 늘림.   

이를 통해서도 초기 값에 대한 영향력이 소실됨.   

이에따라 DenseNet이라는 것도 나왔는데, 기본 skipping 방식은 resnet과 같지만, 이름대로 조밀하게 연결됨.   

기존의 ResNet에서는 앞의 값이 뒤에 단 한번 연결되지만,   

DenseNet은 앞의 값이 뒤로도, 그 뒤로도 이어지며, 초기값이 가장 끝 conv 레이어까지 가기에 영향력이 소실되지 않음.   

DenseNet은 이전 레이어의 값을 재활용하기에 파라미터 절약도가 꽤나 높은 등의 장점을 가졌는데,   

이후 여러 모델들이 나오다가 SENet이 나옷 것이다.   

SENet은 Squeeze-and-Excitation Block이라는 기법을 사용하는데,   

자세한 것은 다음에 설명하고, 이를 통해 각 필터들의 중요도를 재조정할 수 있다는 장점을 지님.   

파라미터와 연산량이 증가하지만, 핵심이 되는 Squeeze-and-Excitation Blocks를 붙이는데는 모델의 제약이 따로 없고,   

증가한 비용에 비해서 성능 향상의 효율이 좋다고 함.   

참고사이트 : https://wiserloner.tistory.com/1241
