package model

import "github.com/olivere/elastic/v7"

// SetupSymptomsAgg ...
func (s *SymptomsAgg) SetupSymptomsAgg(items *elastic.AggregationBucketKeyItems) {
	for _, bucket := range items.Buckets {
		s.SetupBucket(bucket)
	}
}

// SetupBucket ...
func (s *SymptomsAgg) SetupBucket(bucket *elastic.AggregationBucketKeyItem) {
	s.Count += bucket.DocCount
	s.Buckets = append(s.Buckets, &SymptomBucket{
		Count:   bucket.DocCount,
		Symptom: bucket.Key.(string),
	})
}
