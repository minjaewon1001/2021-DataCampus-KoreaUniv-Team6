< FaceNet: A Unified Embedding for Face Recognition and Clustering >
=================================================================

> 논문명 : FaceNet: A Unified Embedding for Face Recognition and Clustering
>
> 발행일 : 17 Jun 2015
>
> 저자 : Florian Schroff, Dmitry Kalenichenko, James Philbin

* 참고 : (공부중)
  - https://webit22.tistory.com/22
  - https://ccss17.github.io/paper/facenet/
  - https://kau-deeperent.tistory.com/75
  - https://butter-shower.tistory.com/233
  - https://m.blog.naver.com/4u_olion/221478534498
  - https://m.blog.naver.com/zxc1552916/221957018715
  - https://wwiiiii.tistory.com/entry/Pairwise-Triplet-Loss
  - https://heung-bae-lee.github.io/2020/07/19/NLP_14/   (Feature and Feature vector)

# Abstract

최근 얼굴 인식 분야가 상당히 발전했음에도 불구하고, 현재의 접근방식으로는 얼굴 인증과 인식을 구조상 효율적으로 구현하는 것에 어려움이 있습니다.
이 논문에서 우리가 소개할 FaceNet이라는 시스템은, 얼굴 이미지로부터 유클리드 공간(거리가 직접적으로 얼굴 유사도를 측정하는)의 mapping을 직접적으로 학습합니다.
얼굴 인식, 검증, 클러스터링과 같은 일들은 FaceNet embedding(feature vectors)을 표준 기술로 사용하여 쉽게 시행될 수 있습니다.

* 
