# GNG-backend Portal Changelog
All notable changes to GNG Portal will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- app/Support/Collection
- ProductController getProductsByCategory method
- vines-with-products, product-with-settings/ api routes
- ApiControllerService getWithProducts, paginate methods
- VineController getWithProducts method
- GrapeSortDimmer, BrandDimmer, LocationDimmer, AssistantPhraseDimmer
- ProductController showProductWithSettings method
- install bumbummen99/shoppingcart
- routes/api cart group
- add CartController methods
- CartItemStoreRequest
- migrations CreateProductsTable, CreateProductCategoriesTable
- factories/ ProductFactory, ProductCategoryFactory
- ProductCategoryTest, ProductTest, CartTest
- app/Http/Services/ProductStockService
- ProductCategoryController getFilters, getStrongDrinksFilters methods

### Removed
- CartResolutionMiddleware
- Models/Cart, CartItem

## [0.0.2] - 2020-08-05
### Added
- AboutInfo, AssistantPhrase, Brand, Champagne, ChampagneGrape, Cognac, 
EmployeeOffer, Event, EventOrder, Favorite, GrapeSort, Liquor, Location, MainPhrase, Order, 
OrderProduct, OrderStatus, Product, Promotion, UserInfo, Vine, Colour, VinesGrape, Vodka, Whiskey, Bag, Glass models
- Http/Services/ApiControllerService, index, show, setImageField methods
- Controllers/AuthController
- Api/ MainPhraseController, CartController, AboutInfoController, LocationController, 
AssistantController, AssistantPhraseController, ProductCategoryController, BrandController, ProductController, VineController,
ChampagneController, CognacController, PromotionController, ColourController, BagController, GlassController
- Services/Cart/CartManager, DatabaseCartService, SessionCartService
- Cart, CartItem, ProductCategory models
- login, user, phrases, about-info, assistant-phrases, product-categories, products, brands, vines, champagnes, cognac api routes
- Localization middleware
- default web route
- lang/{locale?} api route
- GiftIdea, Kit, Rare, Vintage, Translation models
- App/Widgets/ProductDimmer, PhraseDimmer
- install laravel/scout, teamtnt/laravel-scout-tntsearch-driver
- add Searchable to Models/Product
- search-products api route, ProductController search method

### Changed
- Move User model to app/Models
- readme

## [0.0.1] - 2020-05-11
### Added
- CHANGELOG file
- Project version in composer.json
- Install barryvdh/laravel-ide-helper, nunomaduro/larastan, tcg/voyager, laravel/sanctum

<!-- Linked versions -->
[Unreleased]: https://github.com/NikulinIlya/gng-backend/compare/0.0.2...HEAD
[0.0.2]: https://github.com/NikulinIlya/gng-backend/releases/tag/0.0.2
[0.0.1]: https://github.com/NikulinIlya/gng-backend/releases/tag/0.0.1
