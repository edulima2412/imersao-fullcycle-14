package usecase

import "github.com/edulima2412/imersao-fullcycle-14/internal/freight/entity"

type CreateRouteInput struct {
	ID       string  `json:id`
	Name     string  `json:name`
	Distance float64 `json:distance`
	Event    string  `json:event`
}

type CreateRouteOutput struct {
	ID           string  `json:id`
	Name         string  `json:name`
	Distance     float64 `json:distance`
	Status       string  `json:status`
	FreightPrice float64 `json:freight_price`
}

type CreateRouteCase struct {
	Repository entity.RouteRepository
	Freight    entity.FreightInterface
}

func NewCreateRouteUseCase(repository entity.RouteRepository, freight entity.FreightInterface) *CreateRouteCase {
	return &CreateRouteCase{
		Repository: repository,
		Freight:    freight,
	}
}

func (u *CreateRouteCase) Execute(input CreateRouteInput) (*CreateRouteOutput, error) {
	route := entity.NewRoute(input.ID, input.Name, input.Distance)
	u.Freight.Calculate(route)
	err := u.Repository.Create(route)

	if err != nil {
		return nil, err
	}

	return &CreateRouteOutput{
		ID:           route.ID,
		Name:         route.Name,
		Distance:     route.Distance,
		Status:       route.Status,
		FreightPrice: route.FreightPrice,
	}, nil
}
