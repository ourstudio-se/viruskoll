package model

import "github.com/olivere/elastic/v7"

// SetupSymptomsByAgg ...
func (s *Symptoms) SetupSymptomsByAgg(ag *elastic.Aggregations) {

	if healthySymptomsAgg, found := ag.Terms("healthySymptomsAgg"); found {
		s.Healthy.SetupSymptomsAgg(healthySymptomsAgg)
	}

	if unhealthySymptomsAgg, found := ag.Terms("unhealthySymptomsAgg"); found {
		s.Unhealthy.SetupSymptomsAgg(unhealthySymptomsAgg)
		s.Unhealthy.Count = 0
	}

	if dailySituationsAgg, found := ag.Terms("dailySituationsAgg"); found {
		s.DailySituations.SetupSymptomsAgg(dailySituationsAgg)
	}

	// if workSituationsAgg, found := ag.Terms("workSituationsAgg"); found {
	// 	s.DailySituations.SetupSymptomsAgg(workSituationsAgg)
	// }
}

// AnonymizeNeededSymptomsAgg ...
func (s *Symptoms) AnonymizeNeededSymptomsAgg() {
	s.Unhealthy = &SymptomsAgg{
		Buckets: []*SymptomBucket{},
	}
	s.Healthy = &SymptomsAgg{
		Buckets: []*SymptomBucket{},
	}
	s.DailySituations = &SymptomsAgg{
		Buckets: []*SymptomBucket{},
	}
}

// SetupSymptomsAgg ...
func (s *SymptomsAgg) SetupSymptomsAgg(items *elastic.AggregationBucketKeyItems) {
	for _, bucket := range items.Buckets {
		s.Count += bucket.DocCount
		s.SetupBucket(bucket)
	}
}

// SetupSymptomsAggArr ...
func SetupSymptomsAggArr(items *elastic.AggregationBucketKeyItems) []*SymptomBucket {
	result := []*SymptomBucket{}
	for _, bucket := range items.Buckets {
		result = append(result, &SymptomBucket{
			Count:   bucket.DocCount,
			Symptom: bucket.Key.(string),
		})
	}
	return result
}

// SetupBucket ...
func (s *SymptomsAgg) SetupBucket(bucket *elastic.AggregationBucketKeyItem) {
	s.Buckets = append(s.Buckets, &SymptomBucket{
		Count:   bucket.DocCount,
		Symptom: bucket.Key.(string),
	})
}
