import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DonationCreateInput } from '../@generated/prisma-nestjs-graphql/donation/donation-create.input';
import { OrderByParams } from '../graphql';
import { DonationsService } from './donations.service';

@Resolver('Donation')
export class DonationsResolver {
  constructor(private readonly donationsService: DonationsService) { }

  @Mutation('createDonation')
  create(
    @Args('createDonationInput')
    createDonationInput: DonationCreateInput //Prisma.DonationCreateInput
  ) {
    return this.donationsService.create(createDonationInput);
  }

  @Query('donations')
  findAll(
    @Args('orderBy')
    orderBy?: OrderByParams) {
    return this.donationsService.findAll(orderBy);
  }

  @Query('donation')
  findOne(@Args('id') id: number) {
    return this.donationsService.findOne({ id });
  }

  @Query('totalDonations')
  totalDonations(){
    return this.donationsService.getTotal();
  }
}
